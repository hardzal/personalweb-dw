const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);

async function authLogin(req, res) {
    // mengam
}

async function authRegister(req, res) {

}

async function loginPage(req, res) {

}

async function registerPage(req, res) {

}

module.exports = {
  authLogin,
  authRegister,
  loginPage,
  registerPage,
};
