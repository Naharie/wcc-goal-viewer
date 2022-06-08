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
    goalData: GoalData;
}

const initialState: State = {
    status: LoadingStatus.Loading,
    goalData: {
        curriculumGoals: [],
        tracks: [],
        courses: []
    }
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        dataLoadCompleted: (_, { payload }: { payload: GoalData, type: string }) =>
            ({ status: LoadingStatus.Complete, goalData: payload }),
        dataLoadFailed: (state, { payload }: { payload: Error, type: string }) =>
            ({ status: LoadingStatus.Failure, goalData: state.goalData, errorMessage: payload.toString() })
    }
});

export const dataReducer = dataSlice.reducer;
export const { dataLoadCompleted, dataLoadFailed } = dataSlice.actions;

// Selectors

export const selectStatus = (state: State) => state.status;
export const selectErrorMessage = (state: State) => state.errorMessage;
export const selectGoalData = (state: State) => state.goalData;

export const selectCurriculumGoals = (state: State) => state.goalData.curriculumGoals;
export const selectCurriculumGoal = (index: number) => (state: State) => state.goalData.curriculumGoals[index];