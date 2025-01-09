const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function homeIndex(req, res) {
  const userSession = req.session.user ?? null;
  console.log(userSession);

  return res.render("index", { userSession: userSession });
}

async function contactPage(req, res) {
  const userSession = req.session.user ?? null;
  console.log(userSession);

  return res.render("contact", { userSession: userSession });
}

async function aboutPage(req, res) {
  return res.render("about");
}

async function errorPage(req, res) {
  return res.render("error");
}

async function unauthorizedPage(req, res) {
  return res.render("unauthorized");
}

async function notFoundPage(req, res) {
  return res.render("notFoundPage");
}

module.exports = {
  homeIndex,
  contactPage,
  aboutPage,
  unauthorizedPage,
  errorPage,
  notFoundPage,
};
