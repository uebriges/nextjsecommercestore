import camelCaseKeys from 'camelcase-keys';
import postgres from 'postgres';
require('dotenv-safe').config();

const sql = postgres('');

async function getAllProducts() {
  return camelCaseKeys(await sql`SELECT * FROM products`);
}
