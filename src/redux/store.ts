import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "../data/dataSlice";

export const store = configureStore({
    reducer: dataReducer
});

export type AppDispatch = typeof store.dispatch;