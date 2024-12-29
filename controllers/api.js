const { Sequelize } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function blogList() {
  try {
    const result = await db.query(`SELECT * FROM public."Users"`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { blogList };
