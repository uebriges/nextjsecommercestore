exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS payment_preferences (
		payment_preferences_id int GENERATED ALWAYS AS IDENTITY,
		payment_preferences_name varchar(30),
		PRIMARY KEY(payment_preferences_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS payment_preferences;`;
};
