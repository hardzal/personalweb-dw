"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Projects", [
      {
        title: "First post",
        description: "New post for the first time",
        technologies: "js, react, express",
        start_date: new Date("2024-10-10"),
        end_date: new Date("2024-11-11"),
        createdAt: new Date(),
        updatedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Projects", null, {});
  },
};