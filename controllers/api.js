const db = require("../config/connect.js");

async function blogList(req, res) {
  try {
    const result = await db.query(`SELECT * FROM public."Users"`);
    return res.json(result.rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function getTestimonials(req, res) {
  try {
    const result = await db.query(`SELECT * FROM public."Testimonials"`);

    return res.json(result.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { blogList, getTestimonials };
