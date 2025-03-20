import {createSlice} from "@reduxjs/toolkit";
import {createDecode, createEncode} from "./messageThunk.tsx";
import {RootState} from "../app/store.ts";
import {DecodedMessage, EncodedMessage} from "../types";

interface MessageState {
    encodedMessage: EncodedMessage | null;
    decodedMessage: DecodedMessage | null;
    createDecodedLoading: boolean;
    createEncodedLoading: boolean;
}

const initialState: MessageState = {
    encodedMessage:  null,
    decodedMessage: null,
    createDecodedLoading: false,
    createEncodedLoading: false,
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createEncode.pending, (state) => {
            state.createEncodedLoading = true;
        });
        builder.addCase(createEncode.fulfilled, (state, { payload }) => {
            state.createEncodedLoading = false;
            state.encodedMessage = payload;
        });
        builder.addCase(createEncode.rejected, (state) => {
            state.createEncodedLoading = false;
        });

        builder.addCase(createDecode.pending, (state) => {
            state.createDecodedLoading = true;
        });
        builder.addCase(createDecode.fulfilled, (state, { payload } ) => {
            state.createDecodedLoading = false;
            state.decodedMessage = payload;
        });
        builder.addCase(createDecode.rejected, (state) => {
            state.createDecodedLoading = false;
        });
    }
});

export const messageReducer = messageSlice.reducer;
export const selectEncodedMessage = (state: RootState) => state.message.encodedMessage;
export const selectDecodedMessage = (state: RootState) => state.message.decodedMessage;
export const selectEncodedLoading = (state: RootState) => state.message.createEncodedLoading;
export const selectDecodedLoading = (state: RootState) => state.message.createDecodedLoading;