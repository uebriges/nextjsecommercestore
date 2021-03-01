exports.up = async (sql) => {
  await sql`
	INSERT INTO
	images
			(image_data)
	VALUES
		('https://www.weinco.at/assets/Produktbilder/_resampled/ScaleHeightWyIyMDAwIl0/50001830.png')
	`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	images
	`;
};
