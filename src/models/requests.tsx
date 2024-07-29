import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface useGetQueryResponce<T> {
    data: T;
    error?: FetchBaseQueryError | SerializedError;
    isLoading: boolean;
}

// export interface useGetQueryResponce<T> {
//     data: T;
//     error?: FetchBaseQueryError | SerializedError;
//     isLoading: boolean;
// }