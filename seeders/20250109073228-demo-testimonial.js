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
    await queryInterface.bulkInsert("Testimonials", [
      {
        name: "Leo G",
        rating: 5,
        description: "Keren banget websitenya!",
        image: "1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nur M Arofiq",
        rating: 4,
        description: "Mantaapp! Terima kasih.",
        image: "2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rendy Zulfan",
        rating: 3,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis qui molestias blanditiis inventore reprehenderit nesciunt sequi pariatur quaerat? Error?",
        image: "3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Syifa Maulaya",
        rating: 4,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, commodi obcaecati necessitatibus totam reprehenderit fuga.",
        image: "4.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pandu Rizky",
        rating: 5,
        description: "Keren bener gannn",
        image: "5.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
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
    await queryInterface.bulkDelete("Testimonials", null, {});
  },
};
