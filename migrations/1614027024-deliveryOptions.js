exports.up = async (sql) => {
  await sql`
	CREATE TABLE delivery_options (
		delivery_options_id int GENERATED ALWAYS AS IDENTITY,
		delivery_options_name varchar(30),
		PRIMARY KEY(delivery_options_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE delivery_options;`;
};
