import camelCaseKeys from 'camelcase-keys';
import postgres from 'postgres';
const test = require('dotenv-safe').config();
let sql = postgres();

if (process.env.NODE_ENV === 'production') {
  sql = postgres({ ssl: true });
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
  let productIdArray = [];
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

  const result = await sql`
  INSERT INTO customer_order_products ${sql(
    orderProducts,
    'customer_order_id',
    'product_id',
    'quantity',
  )}`;

  return orderId;
}

module.exports = {
  getAllProducts: getAllProducts,
  getAdditionalInfoForCartItemsCookie: getAdditionalInfoForCartItemsCookie,
  persistOrder: persistOrder,
};

// export async function getSingleProduct(id) {
//   return camelCaseKeys(
//     await sql`select products.product_id, products.product_name, products.production_year, products.price_per_unit, products.product_description, products.producer, products.inventory, STRING_AGG (cast(image_data as varchar),';') as images_per_product from products, products_images, images where products.product_id = products_images.product_id group by products.product_id order by 1;`,
//   );
// }

// export async function getProductImageLinks() {
//   return camelCaseKeys(
//     await sql`select product_id, STRING_AGG (cast(image_data as varchar),', ') as ImagesPerProduct from products_images, images group by product_id order by 1;`,
//   );
// }

// select image_data from products_images inner join images on  products_images.product_id = ${product_id};
// select image_data from products_images inner join images on  products_images.product_id = ${product_id} // lists all image paths of a specific product
// select product_id, STRING_AGG (cast(image_data as varchar),', ') as ImagesPerProduct from products_images, images group by product_id order by 1; // lists all images_id and corresponding image paths
// select product_id, STRING_AGG (cast(image_data as varchar),', ') as ImagesPerProduct from products_images, images where product_id = 3 group by product_id order by 1; // lists image paths of product with product_id = 3
