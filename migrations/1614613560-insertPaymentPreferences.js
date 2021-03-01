exports.up = async (sql) => {
  await sql`
	INSERT INTO
	payment_preferences
			(payment_preferences_name)
	VALUES
		('Credit Card'),
		('Bill')
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	payment_preferences
	`;
};
