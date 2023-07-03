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
      isactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null,
      },
      activationlink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  User.associate = (models) => {
    User.hasOne(models.Token, { onDelete: 'cascade' });
  };

  return User;
};
