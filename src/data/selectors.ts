import type { State } from "./dataSlice";

export const selectStatus = (state: State) => state.status;
export const selectErrorMessage = (state: State) => state.errorMessage;
export const selectGoalData = (state: State) => state.goalData;