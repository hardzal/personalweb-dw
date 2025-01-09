const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function testimonialPage(req, res) {
  const userSession = req.session.user ?? null;
  console.log(userSession);
  console.log("bisa kok");
  return res.render("testimonial", {
    userSession: userSession,
  });
}

async function testimonialAddPage(req, res) {}

async function testimonialAdd(req, res) {}

async function testimonialUpdatePage(req, res) {}

async function testimonialUpdate(req, res) {}

async function testimonialDelete(req, res) {}

async function testimonialDetail(req, res) {}

module.exports = {
  testimonialPage,
  testimonialAddPage,
  testimonialAdd,
  testimonialUpdatePage,
  testimonialUpdate,
  testimonialDelete,
  testimonialDetail,
};
