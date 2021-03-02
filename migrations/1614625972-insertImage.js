exports.up = async (sql) => {
  await sql`
	INSERT INTO
	images
			(image_data)
	VALUES
		('asdklf');
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	images;
	`;
};
