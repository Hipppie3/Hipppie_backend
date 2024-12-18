'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Players', 'sportId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Sports',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',    
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Players', 'sportId');
  }
};
