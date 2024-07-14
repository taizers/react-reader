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
      release_date: {
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
      primory_link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      downloads: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
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

  Book.associate = (models) => {
    Book.belongsTo(models.Seria, { onDelete: 'cascade', foreignKey: "seria_id", as: 'seria' });
    Book.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "user_id" });
    Book.belongsToMany(models.Genre, { through: 'Book_Genre', onDelete: 'cascade', as: 'book_genres' });
    Book.belongsToMany(models.Tag, { through: 'Book_Tag', onDelete: 'cascade', as: 'book_tags' });
    Book.belongsToMany(models.Library, { through: models.Library_book });
  };

  return Book;
};
