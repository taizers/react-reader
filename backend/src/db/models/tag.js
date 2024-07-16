import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tag',
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

  Tag.associate = (models) => {
    Tag.belongsToMany(models.Book, {
      through: 'book_tags',
      onDelete: 'cascade',
    });
    Tag.belongsToMany(models.Seria, {
      through: 'seria_tags',
      onDelete: 'cascade',
    });
  };

  return Tag;
};
