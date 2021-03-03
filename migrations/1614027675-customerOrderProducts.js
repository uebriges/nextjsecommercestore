exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS customer_order_products (
		customer_order_id int,
		product_id int,
		quantity int,
		CONSTRAINT fk_customer_order_id
			FOREIGN KEY(customer_order_id)
				REFERENCES customer_orders,
		CONSTRAINT fk_product_id
			FOREIGN KEY(product_id)
				REFERENCES products
		);`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS customer_order_products;`;
};
