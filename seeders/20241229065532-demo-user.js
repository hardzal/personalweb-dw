"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "first_user",
        password: 123456,
        email: "example@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "second_user",
        password: 123456,
        email: "example1@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin",
        password: 123456,
        email: "admin@example.com",
        createdAt: new Date(),
        updatedAt: new Date(), // numpuk
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
