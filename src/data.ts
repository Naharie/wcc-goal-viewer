import { createSlice } from "@reduxjs/toolkit";
import { GoalData } from "./types/data";

export enum LoadingStatus
{
    Loading,
    Complete,
    Failure
}

export interface State
{
    status: LoadingStatus;
    /**
     * If present, the internal exception that should be shown to the user.
     */
    errorMessage?: string;
    goalData?: GoalData;
}

const initialState: State = {
    status: LoadingStatus.Loading,
    goalData: undefined
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        dataLoadCompleted: (_, { payload }: { payload: GoalData, type: string }) =>
            ({ status: LoadingStatus.Complete, goalData: payload }),
        dataLoadFailed: (_, { payload }: { payload: Error, type: string }) =>
            ({ status: LoadingStatus.Failure, errorMessage: payload.toString() })
    }
});

export const dataReducer = dataSlice.reducer;
export const { dataLoadCompleted, dataLoadFailed } = dataSlice.actions;

// Selectors

export const selectStatus = (state: State) => state.status;
export const selectErrorMessage = (state: State) => state.errorMessage;
export const selectGoalData = (state: State) => state.goalData;