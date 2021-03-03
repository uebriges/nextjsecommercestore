exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS products_images (
		image_id int,
		product_id int,
		CONSTRAINT fk_image_id
			FOREIGN KEY(image_id)
				REFERENCES images
		);`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS products_images;`;
};
