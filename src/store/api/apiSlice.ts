import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { logOut, setUserToken, setUserData } from '../reducers/AuthSlice';
import { apiUrl } from '../../constants/constants';
import { clearToken, getToken, setToken } from '../../utils';
import { useAppDispatch } from '../../hooks';

const baseQuery = fetchBaseQuery({
    baseUrl: `${apiUrl}`,
    credentials: 'include',
    prepareHeaders: (headers, state: any) => {
        const token = state.getState().auth.token;
        try {
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
        } catch (error) {
            console.log(error);
        }

        return headers;
    }
})

type IRefreshResultData = {
    user: object;
    user_session: {
        access_token: string;
        refresh_token: string;
    };
};

const baseQueryWithReauth = async(args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log('sending refresh token');
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        console.log(refreshResult);

        if (refreshResult?.data) {
            const resultData = {...refreshResult.data} as IRefreshResultData;

            const token = resultData.user_session?.access_token;
            const user = resultData.user;

            //store the new token
            setToken(token);
            api.dispatch(setUserToken(token));

            api.dispatch(setUserData(user));

            //retry original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
            clearToken();
        }
    }
    console.log(result);
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({}),
}) 
