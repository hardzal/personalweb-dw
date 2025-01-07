const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function homeIndex(req, res) {
  const userSession = req.session.user || null;

  res.render("index", { userSession: userSession });
}

async function contactPage(req, res) {
  const userSession = req.session.user || null;

  res.render("contact", { userSession: userSession });
}

async function aboutPage(req, res) {}

module.exports = {
  homeIndex,
  contactPage,
  aboutPage,
};
