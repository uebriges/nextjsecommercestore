exports.up = async (sql) => {
  await sql`
	CREATE TABLE products (
		product_id int GENERATED ALWAYS AS IDENTITY,
		product_name varchar(50),
		production_year numeric(4,0),
		price_per_unit decimal(12,2),
		product_description text,
		producer varchar(40),
		inventory int,
		deleted boolean,
		PRIMARY KEY(product_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE products;`;
};
