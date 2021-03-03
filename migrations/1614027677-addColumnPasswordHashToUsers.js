exports.up = async (sql) => {
  await sql`
    ALTER TABLE IF EXISTS customers
      ADD COLUMN password_hash VARCHAR(100);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE IF EXISTS customers
      DROP COLUMN password_hash;
  `;
};
