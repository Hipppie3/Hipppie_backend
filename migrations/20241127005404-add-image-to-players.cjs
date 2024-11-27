'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.addColumn('Players', 'image', {
    type: Sequelize.STRING,
    allowNull: true,
  });
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn('Players', 'image');
  },
};
