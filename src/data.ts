import create from "zustand";
import { GoalData } from "./types/data";

export enum LoadingStatus
{
    Loading,
    Complete,
    Failure
}

export interface Store
{
    loadingStatus: LoadingStatus;
    errorMessage?: string;
    data: GoalData;

    loadCompleted(goalData: GoalData): void;
    loadFailed(error: string): void;
}

const useStore = create<Store>(set => ({
    loadingStatus: LoadingStatus.Loading,
    data: {
        curriculumGoals: [],
        tracks: [],
        courses: []
    },

    loadCompleted: (data: GoalData) => set(() => ({
        loadingStatus: LoadingStatus.Complete,
        data
    })),
    loadFailed: (error: string) => set(() => ({
        loadingStatus: LoadingStatus.Failure,
        errorMessage: error
    }))
}));

export default useStore;