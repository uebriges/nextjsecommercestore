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

export async function getAllProducts() {
  const products = await sql`select products.product_id, products.product_name, products.production_year, products.price_per_unit, products.product_description, products.producer, products.inventory, STRING_AGG (cast(image_data as varchar),';') as images_per_product from products, products_images, images where products.product_id = products_images.product_id group by products.product_id order by 1;`;
  return products.map((product) => camelCaseKeys(product));
}

export async function getAdditionalInfoForCookiesCartProduct() {
  const products = await sql`select products.product_id, products.product_name, products.production_year, products.price_per_unit, products.product_description, products.producer, products.inventory, STRING_AGG (cast(image_data as varchar),';') as images_per_product from products, products_images, images where products.product_id = products_images.product_id group by products.product_id order by 1;`;
  return products.map((product) => camelCaseKeys(product));
}

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

module.exports = {
  getAllProducts: getAllProducts,
  // getProductImageLinks: getProductImageLinks,
};
