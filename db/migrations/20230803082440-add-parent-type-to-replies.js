'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Replies', 'parent_type', {
      type: Sequelize.ENUM('reply', 'comment'),
      allowNull: false,
      defaultValue: 'comment',
    });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Replies', 'parent_type');
  },
};
