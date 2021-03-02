exports.up = async (sql) => {
  await sql`
	INSERT INTO
	products
			(product_name,
			production_year,
			price_per_unit,
			product_description,
			inventory)
	VALUES
		('Time Waits For No One Red Skull 2019',
		2019,
		10.20,
		'Best wine ever',
		10
		);
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	products;
	`;
};
