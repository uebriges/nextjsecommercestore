exports.up = async (sql) => {
  await sql`
	INSERT INTO
	products_images
			(image_id,
			product_id)
	VALUES
		(1,
		1)
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	products_images
	`;
};
