exports.up = async (sql) => {
  await sql`
	INSERT INTO
	images
			(image_data)
	VALUES
		('/FincaBarcaTimeWaitsForNoOneRed2019.webp');
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	images;
	`;
};
