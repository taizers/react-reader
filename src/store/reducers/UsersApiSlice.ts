import { apiSlice } from "../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: id => ({
                url: `/users/${id}`,
            })
        }),
        getUsers: builder.query({
            query: ({page, limit}) => ({
                url: `/users?page=${page}&limit=${limit}`,
            })
        }),
        updateUser: builder.mutation({
            query: ({id, user}) => ({
                url: `/users/${id}`,
                method: 'UPDATE', 
                body: { ...user }
            })
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE', 
            })
        }),
    })
})
