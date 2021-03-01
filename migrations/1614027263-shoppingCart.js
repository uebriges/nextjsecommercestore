exports.up = async (sql) => {
  await sql`
	CREATE TABLE shopping_cart (
		customer_id int,
		product_id int,
		quantity int,
		PRIMARY KEY(customer_id),
		CONSTRAINT fk_customer_id
			FOREIGN KEY(customer_id)
				REFERENCES customers,
		CONSTRAINT fk_product_id
			FOREIGN KEY(product_id)
				REFERENCES products
);`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE shopping_cart;`;
};
