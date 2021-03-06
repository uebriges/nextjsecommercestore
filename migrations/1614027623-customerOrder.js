exports.up = async (sql) => {
  await sql`
	CREATE TABLE IF NOT EXISTS customer_orders (
		customer_order_id int GENERATED ALWAYS AS IDENTITY,
		customer_id int,
		delivery_option_id int,
		payment_preference_id int,
		order_date date,
		sum decimal(12,2),
		PRIMARY KEY(customer_order_id),
		CONSTRAINT fk_customer_id
			FOREIGN KEY(customer_id)
				REFERENCES customers,
		CONSTRAINT fk_delivery_option_id
			FOREIGN KEY(delivery_option_id)
				REFERENCES delivery_options,
		CONSTRAINT fk_payment_preference_id
			FOREIGN KEY(payment_preference_id)
				REFERENCES payment_preferences
		);`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE IF EXISTS customer_orders;`;
};
