const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function homeIndex(req, res) {
  const query = `SELECT * FROM public."Projects"`;
  const projectsData = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.render("index", { data: projectsData });
}

async function contactPage(req, res) {
  res.render("contact");
}

module.exports = {
  homeIndex,
  contactPage,
};
