'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
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
      refresh_token: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
