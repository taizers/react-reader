import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../models/IUser";
import { apiUrl } from "../../constants/constants";

export const fetchProfile = createAsyncThunk(
    'auth/getProfile',
    async(_, thunkAPI) => {
        const responce = await axios.get<IUser>(`${apiUrl}refresh-token`);
        return responce.data;
    }
)