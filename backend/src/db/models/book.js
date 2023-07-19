import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Book = sequelize.define(
    'book',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      releaseDate: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      annotation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      tags: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      jenre: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('created_at')).format(
            'YYYY-MM-DD[T]HH:mm:ss.SSS'
          );
        },
      },
    },
    {
      paranoid: true,
    }
  );

  // Book.associate = (models) => {
  //   Book.hasOne(models.Token, { onDelete: 'cascade' });
  // };

  return Book;
};
