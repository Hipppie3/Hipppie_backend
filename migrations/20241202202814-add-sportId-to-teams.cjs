'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Teams', 'sportId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Optional: Change to `false` if it's required
      references: {
        model: 'Sports', // Table name of the Sports model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Teams', 'sportId');
  }
};
