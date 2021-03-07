import camelCaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

// Set env variable for the Heroku db
setPostgresDefaultsOnHeroku();

require('dotenv-safe').config();
let sql;

if (process.env.NODE_ENV === 'production') {
  // Heroku needs SSL connections but
  // has an "unauthorized" certificate
  // https://devcenter.heroku.com/changelog-items/852
  sql = postgres({ ssl: { rejectUnauthorized: false } });
} else {
  if (!globalThis.__postgresSqlClient) {
    globalThis.__postgresSqlClient = postgres();
  }
  sql = globalThis.__postgresSqlClient;
}

// Get all products

export async function getAllProducts() {
  const products = await sql`
  SELECT
    products.product_id,
    products.product_name,
    products.production_year,
    products.price_per_unit,
    products.product_description,
    products.producer,
    products.inventory,
    STRING_AGG (cast(image_data as varchar),';') as images_per_product
  FROM products, products_images, images
  WHERE products.product_id = products_images.product_id
  GROUP BY products.product_id
  ORDER BY 1;`;

  return products.map((product) => camelCaseKeys(product));
}

// Get additional info which is not stored in the cookies shopping cart

export async function getAdditionalInfoForCartItemsCookie(shoppingCartArray) {
  const productIdArray = [];
  let additionalProductInformation;
  for (let i = 0; i < shoppingCartArray.length; i++) {
    productIdArray.push(shoppingCartArray[i].productId);
  }

  if (productIdArray.length !== 0) {
    additionalProductInformation = await sql`
    SELECT DISTINCT
      products.product_id,
      products.product_name,
      products.price_per_unit,
      products_images.image_id,
      images.image_data
    FROM products
      INNER JOIN products_images
        ON products.product_id = products_images.product_id
      INNER JOIN images
        ON products_images.image_id = images.image_id
    WHERE products.product_id IN (${productIdArray})`;
    return additionalProductInformation.map((productInfo) =>
      camelCaseKeys(productInfo),
    );
  } else {
    return [];
  }
}

// Persist new order in database

export async function persistOrder(shoppingCart, deliveryOptionId, customerId) {
  // calculate sum of the order

  const sum = shoppingCart.reduce(
    (accu, product) =>
      accu + Number(product.quantity) * Number(product.pricePerUnit),
    0,
  );

  // Store order in customer_orders

  let orderId = await sql`
  INSERT INTO customer_orders
    (customer_id,
    delivery_option_id,
    sum)
  VALUES
    (${customerId},
    ${deliveryOptionId},
    ${sum})
  RETURNING customer_order_id;`;

  orderId = orderId[0].customer_order_id;

  // Array for storing the product of the order

  const orderProducts = shoppingCart.map((product) => {
    return {
      customer_order_id: orderId,
      product_id: product.productId,
      quantity: product.quantity,
    };
  });

  // Store products of order

  await sql`
  INSERT INTO customer_order_products ${sql(
    orderProducts,
    'customer_order_id',
    'product_id',
    'quantity',
  )}`;

  return orderId;
}

// Check if user name exists

export async function userNameExists(username) {
  const users = await sql`
    SELECT *
    FROM customers
    WHERE user_name = ${username};
  `;

  return users.length !== 0;
}

// Check if user name exists

export async function getUserByUserName(username) {
  const user = await sql`
    SELECT *
    FROM customers
    WHERE user_name = ${username};
  `;

  if (user.length !== 0) {
    return user.map((currentUser) => camelCaseKeys(currentUser));
  } else {
    return false;
  }
}

// Add new user/customer

export async function registerUser(username, email, password) {
  const user = await sql`
    INSERT INTO
      customers (
          user_name, email,
          password_hash
      )
    VALUES (${username}, ${email}, ${password});
  `;

  return user.map((currentUser) => camelCaseKeys(currentUser));
}

export async function createSession(userId, token) {
  await sql`
    INSERT INTO sessions
      (user_id, token)
    VALUES
      (${userId}, ${token})
  `;
}

export async function deleteSession(token) {
  const deletedSession = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *;
  `;

  return deletedSession.map((currentSession) => camelCaseKeys(currentSession));
}

export async function updateProduct(
  productId,
  productDescription,
  pricePerUnit,
) {
  const product = await sql`
    UPDATE products
    SET
      price_per_unit = ${Number(pricePerUnit)},
      product_description = ${productDescription}
    WHERE product_id = ${productId}
    RETURNING product_id;
  `;
  return product.map((currentProduct) => camelCaseKeys(currentProduct));
}

export async function deleteProduct(productId) {
  const deletedProductId = await sql`
    DELETE FROM
      products
    WHERE
      product_id = ${productId}
    RETURNING product_id;
  `;

  return deletedProductId.map((currentProduct) =>
    camelCaseKeys(currentProduct),
  );
}

export async function isSessionValid(token) {
  const sessions = await sql`
    SELECT *
    FROM
      sessions
    WHERE
      token = ${token}
  `;
  return sessions.map((currentSession) => camelCaseKeys(currentSession));
}

export async function getUserByToken(token) {
  let user = await sql`
  SELECT
    customers.customer_id as id,
    admin as is_admin,
    user_name,
    sessions.expiry_timestamp as timestamp
  FROM
    sessions,
    customers
  WHERE
    token = ${token}
    AND sessions.user_id = customers.customer_id;`;

  user = user[0].timestamp < new Date() ? [] : user;
  user[0].timestamp = '';

  return user.map((currentUser) => camelCaseKeys(currentUser));
}

module.exports = {
  getAllProducts: getAllProducts,
  getAdditionalInfoForCartItemsCookie: getAdditionalInfoForCartItemsCookie,
  persistOrder: persistOrder,
  userNameExists: userNameExists,
  registerUser: registerUser,
  // passwordValid: passwordValid,
  createSession: createSession,
  getUserByUserName: getUserByUserName,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getUserByToken: getUserByToken,
  deleteSession: deleteSession,
};

// SELECT
//     products.product_id,
//     products.product_name,
//     products.production_year,
//     products.price_per_unit,
//     products.product_description,
//     products.producer,
//     products.inventory,
//     STRING_AGG (cast(image_data as varchar),';') as images_per_product
//   FROM products, products_images, images
//   WHERE products.product_id = products_images.product_id
//   GROUP BY products.product_id
//   ORDER BY 1;
