export default (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'token',
    {
      refreshtoken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  Token.associate = (models) => {
    Token.belongsTo(models.User, { onDelete: 'cascade', foreignKey: "user_id",});
  };

  return Token;
};
