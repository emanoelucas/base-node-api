'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
