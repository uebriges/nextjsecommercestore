exports.up = async (sql) => {
  await sql`
	INSERT INTO
	customers
			(
				first_name,
				last_name,
				user_name,
				password_hash,
				admin)
	VALUES
		(
			'admin',
			'admin',
			'admin',
			'$argon2i$v=19$m=4096,t=3,p=1$u4uzLd+BfWxER4CXvRjZiw$zsezJDLAXYAH+lPsHUFtlwe368KrSSYWkavjimKoS8c',
			true)
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	customers;
	`;
};
