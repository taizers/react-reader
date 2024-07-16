import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Library = sequelize.define(
    'library',
    {
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
      tableName: 'libraries',
    }
  );

  Library.associate = (models) => {
    Library.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: 'user_id',
    });
    Library.belongsToMany(models.Book, { through: models.Library_book });
  };

  return Library;
};
