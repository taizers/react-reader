import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Seria = sequelize.define(
    'seria',
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
      tableName: 'series',
    }
  );

  Seria.associate = (models) => {
    Seria.hasMany(models.Book, {
      onDelete: 'cascade',
      foreignKey: 'seria_id',
      as: 'seriabooks',
    });
    Seria.belongsToMany(models.Genre, {
      through: 'seria_genres',
      onDelete: 'cascade',
      foreignKey: 'seria_id'
    });
    Seria.belongsToMany(models.Tag, {
      through: 'seria_tags',
      onDelete: 'cascade',
      foreignKey: 'seria_id'
    });
    Seria.belongsTo(models.User, { onDelete: 'cascade', foreignKey: 'user_id' });
  };

  return Seria;
};
