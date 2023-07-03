'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'tokens',
      [
        {
          refreshtoken: '3jukiujyhhtht',
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          refreshtoken: '2hytrjyujytnyunyunyu',
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          refreshtoken: '1ghyrtyhytrth',
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('tokens', null, {});
  },
};
