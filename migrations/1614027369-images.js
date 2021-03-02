exports.up = async (sql) => {
  await sql`
	CREATE TABLE images (
		image_id int GENERATED ALWAYS AS IDENTITY,
		image_data text,
		PRIMARY KEY(image_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE images;`;
};
