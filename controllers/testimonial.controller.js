const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function testimonialPage(req, res) {
  const userSession = req.session.user ?? null;
  const link = req.originalUrl.split("/");

  return res.render("testimonial", {
    userSession: userSession,
    path: link[1],
  });
}

async function testimonialAddPage(req, res) {
  return res.render("testimonial-add");
}

async function testimonialAdd(req, res) {}

async function testimonialUpdatePage(req, res) {
  return res.render("testimonial-edit");
}

async function testimonialUpdate(req, res) {}

async function testimonialDelete(req, res) {}

module.exports = {
  testimonialPage,
  testimonialAddPage,
  testimonialAdd,
  testimonialUpdatePage,
  testimonialUpdate,
  testimonialDelete,
};
