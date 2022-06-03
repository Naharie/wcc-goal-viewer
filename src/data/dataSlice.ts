import { createSlice } from "@reduxjs/toolkit";
import { GoalData } from "../types/data";
import { Status } from "./status";

export interface State
{
    status: Status;
    /**
     * If present, the internal exception that should be shown to the user.
     */
    errorMessage?: string;
    goalData?: GoalData;
}

const initialState: State = {
    status: Status.Loading,
    goalData: undefined
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        dataLoadCompleted: (_, { payload }: { payload: GoalData, type: string }) =>
            ({ status: Status.Complete, goalData: payload }),
        dataLoadFailed: (_, { payload }: { payload: Error, type: string }) =>
            ({ status: Status.Failure, errorMessage: payload.toString() })
    }
});

export const dataReducer = dataSlice.reducer;
export const { dataLoadCompleted, dataLoadFailed } = dataSlice.actions;