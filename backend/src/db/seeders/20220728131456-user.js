'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'test1',
          email: 'test1@mail',
          password: 'test1',
          activationlink: 'bhrfrthy6thgrfrth',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'test2',
          email: 'test2@mail',
          password: 'test2',
          activationlink: 'y7brver65r6tn7t7',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'test3',
          email: 'test3@mail',
          password: 'test3',
          activationlink: 'tb7trv7e4ev6bnt7',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
