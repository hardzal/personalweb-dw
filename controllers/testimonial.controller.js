const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function testimonialPage() {}

async function testimonialAddPage() {}

async function testimonialAdd() {}

async function testimonialUpdatePage() {}

async function testimonialUpdate() {}

async function testimonialDelete() {}

module.exports = {
  testimonialPage,
  testimonialAddPage,
  testimonialAdd,
  testimonialUpdatePage,
  testimonialUpdate,
  testimonialDelete,
};
