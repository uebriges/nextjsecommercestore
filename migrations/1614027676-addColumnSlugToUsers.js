exports.up = async (sql) => {
  await sql`
    ALTER TABLE IF EXISTS customers
      ADD COLUMN slug VARCHAR(40) UNIQUE;
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE IF EXISTS customers
      DROP COLUMN slug;
  `;
};
