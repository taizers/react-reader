import moment from 'moment';

export default (sequelize, DataTypes) => {
  const Library_book = sequelize.define(
    'library_book',
    {
      state: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      last_page: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      last_open: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      progress: {
        type: DataTypes.INTEGER,
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

  return Library_book;
};
