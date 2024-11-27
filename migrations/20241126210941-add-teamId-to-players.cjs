'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Players', 'teamId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Make it nullable initially to avoid breaking existing data
      references: {
        model: 'Teams', // Name of the referenced table
        key: 'id',      // Key in the referenced table
      },
      onUpdate: 'CASCADE', // Update teamId on Player if Team's id changes
      onDelete: 'SET NULL', // Set teamId to NULL if the Team is deleted
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Players', 'teamId');
  },
};
