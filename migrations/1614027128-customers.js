exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS customers (
		customer_id int GENERATED ALWAYS AS IDENTITY,
		first_name varchar(40),
		last_name varchar(40),
		email text,
		address_street varchar(50),
		address_street_nr varchar(10),
		address_county varchar(50),
		address_city varchar(50),
		address_zip varchar(10),
		address_country varchar(50),
		admin boolean,
		user_name varchar(40),
		PRIMARY KEY(customer_id),
		delivery_option int,
		payment_preference int,
		CONSTRAINT fk_delivery_option_id
			FOREIGN KEY(delivery_option)
				REFERENCES delivery_options(delivery_options_id),
		CONSTRAINT fk_payment_preferences_id
			FOREIGN KEY(payment_preference)
				REFERENCES payment_preferences(payment_preferences_id));`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS customers;`;
};
