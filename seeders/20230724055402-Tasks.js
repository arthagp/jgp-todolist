'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
    */
    await queryInterface.bulkInsert('Tasks', [{
      title: 'Membaca Dokumentasi NextJs',
      description: 'mengerti dan memahami dalam client side rendering dan server side rendering',
      deadline: '2023-08-25',
      status: 'Done',
      listTask_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
