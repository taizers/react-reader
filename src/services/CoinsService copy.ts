// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
// import { baseUrl } from '../constants';

// export const usersApi = createApi({
//   reducerPath: 'UsersApi',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (build) => ({
//     fetchAllCoins: build.query<
//       { data: [] },
//       { limit: number; offset: number; search?: string }
//     >({
//       query: ({ limit = 5, offset = 0, search }) => {
//         if (search) {
//           return {
//             url: '/assets',
//             params: {
//               limit,
//               offset,
//               search
//             },
//           }
//         }

//         return {
//           url: '/assets',
//           params: {
//             limit,
//             offset,
//           },
//         }
//       },
//     }),
//     fetchCoinsCount: build.query<{ data: [] }, string>({
//       query: (search = '') => {
//         if (search) {
//           return {
//             url: '/assets',
//             params: {
//               search
//             },
//           }
//         }

//         return {
//           url: '/assets',
//         }
//       },
//     }),
//     fetchCoin: build.query<{ data: object }, string>({
//       query: (id: string) => ({
//         url: `/assets/${id}`,
//       }),
//     }),
//     fetchPopularCoins: build.query<{ data: [] }, string>({
//       query: () => ({
//         url: '/assets',
//         params: {
//           limit: 0,
//           offset: 0,
//         }
//       }),
//     }),
//     fetchCoinsByIds: build.query<{ data: [] }, string>({
//       query: (ids: string) => ({
//         url: '/assets',
//         params: {
//           ids
//         },
//       }),
//     }),
//     fetchCoinHistory: build.query<
//       { data: [] },
//       { id: string; interval: string; start: number; end: number }
//     >({
//       query: ({ id, interval, start, end }) => ({
//         url: `/assets/${id}/history`,
//         params: {
//           interval,
//           start,
//           end,
//         },
//       }),
//     }),
//   }),
// });

export const f='';

