import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    'genre',
    {
      title: {
        type: DataTypes.STRING,
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

  Genre.associate = (models) => {
    Genre.belongsToMany(models.Book, {
      through: 'book_genres',
      onDelete: 'cascade',
    });
    Genre.belongsToMany(models.Seria, {
      through: 'seria_genres',
      onDelete: 'cascade',
    });
  };

  return Genre;
};
