exports.up = async (sql) => {
  await sql`
	CREATE TABLE images (
		image_id int GENERATED ALWAYS AS IDENTITY,
		image_data bytea,
		PRIMARY KEY(image_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE images;`;
};
