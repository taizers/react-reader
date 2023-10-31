import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Book_storage = sequelize.define(
    'book_storage',
    {
      link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
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

  Book_storage.associate = (models) => {
    Book_storage.belongsTo(models.Book, { onDelete: 'cascade', foreignKey: "book_id",});
    Book_storage.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "user_id",});
  };

  return Book_storage;
};
