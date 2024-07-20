/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('library_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      book_id: {
        allowNull: false,
        references: {
          model: 'books',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      state: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      last_page: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      last_open: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.DATE,
      },
      progress: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('library_books');
  },
};
