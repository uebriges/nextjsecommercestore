exports.up = async (sql) => {
  await sql`
    ALTER TABLE customers
      ADD COLUMN password_hash VARCHAR(100);
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE customers
      DROP COLUMN password_hash;
  `;
};
