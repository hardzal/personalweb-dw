const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const db = new Sequelize(config.production);

async function blogList(req, res) {
  try {
    const result = await db.query(`SELECT * FROM public."Users"`);
    return res.json(result[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getTestimonials(req, res) {
  try {
    const result = await db.query(`SELECT * FROM public."Testimonials"`);

    return res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { blogList, getTestimonials };
