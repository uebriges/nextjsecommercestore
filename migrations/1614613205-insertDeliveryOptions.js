exports.up = async (sql) => {
  await sql`
	INSERT INTO
		delivery_options
			(delivery_options_name)
	VALUES
		('Standard'),
		('Premium')
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	delivery_options
	`;
};
