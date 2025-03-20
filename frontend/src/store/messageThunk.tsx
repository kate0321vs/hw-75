import {createAsyncThunk} from "@reduxjs/toolkit";
import {DecodedMessage, EncodedMessage, Message} from "../types";
import axiosApi from "../axiosApi.ts";

export const createEncode = createAsyncThunk<EncodedMessage, Message>(
    'message/createEncode',
    async (message) => {
        const response = await axiosApi.post('/encode', {message: message.message,
            password: message.password});
        return response.data;
    }
);

export const createDecode = createAsyncThunk<DecodedMessage, Message>(
    'message/createDecode',
    async (message) => {
            const response = await axiosApi.post('/decode', {message: message.message,
            password: message.password});
            return response.data;
    }
);