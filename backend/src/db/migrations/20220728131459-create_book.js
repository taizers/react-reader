/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      seria_id: {
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'series',
          key: 'id',
        },
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      releaseDate: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.DATE,
      },
      cover: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      author: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      annotation: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      tags: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      categories: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      source: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.STRING,
      },
      link: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.TEXT,
      },
      downloads: {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.DataTypes.TEXT,
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
    return queryInterface.dropTable('books');
  },
};
