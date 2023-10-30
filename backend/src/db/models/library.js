import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Library = sequelize.define(
    'Library',
    {
      state: {
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

  Library.associate = (models) => {
    Library.belongsTo(models.Book, { onDelete: 'cascade', foreignKey: "book_id",});
    Library.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "user_id",});
  };

  return Library;
};
