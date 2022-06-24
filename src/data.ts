import create from "zustand";
import { GoalData } from "./types/data";

export interface Store
{
    isLoaded: boolean;
    errorMessage?: string;
    data: GoalData;

    loadCompleted(goalData: GoalData): void;
    loadFailed(error: string): void;
}

const useStore = create<Store>(set => ({
    isLoaded: false,
    data: {
        curriculumGoals: [],
        tracks: [],
        courses: []
    },

    loadCompleted: (data: GoalData) => set(() => ({
        isLoaded: true,
        data
    })),
    loadFailed: (error: string) => set(() => ({
        isLoaded: true,
        errorMessage: error
    }))
}));

export default useStore;