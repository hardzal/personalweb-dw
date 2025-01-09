const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();
try {
  const pool = new Pool({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
  });

  module.exports = {
    query: (text, params) => pool.query(text, params),
  };
} catch (error) {
  // throw error;
  console.log("Error: ", error);
}
