import moment from 'moment';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      role: {
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

  User.associate = (models) => {
    User.hasOne(models.Token, { onDelete: 'cascade', foreignKey: 'user_id' });
    User.hasMany(models.Book, { onDelete: 'cascade', foreignKey: 'user_id' });
    User.hasMany(models.Seria, { onDelete: 'cascade', foreignKey: 'user_id' });
    User.belongsToMany(models.Book, {
      through: models.Library_book,
      onDelete: 'cascade',
      foreignKey: 'user_id',
      as: 'LibraryBooks'
    });
  };

  return User;
};
