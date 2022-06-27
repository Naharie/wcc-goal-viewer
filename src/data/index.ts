import { proxy } from "valtio";
import { GoalData } from "./types";

export interface Highlight
{
    curriculumGoals: Record<string, Record<string, boolean>>;
    tracks: Record<string, Record<string, boolean>>;
    courses: Record<string, Record<string, boolean>>;
}

export interface Store
{
    isLoaded: boolean;
    errorMessage: string | null;
    data: GoalData;
    highlight: Highlight;
}

const store = proxy<Store>({
    isLoaded: false,
    errorMessage: null,
    data: {
        curriculumGoals: [],
        tracks: [],
        courses: []
    },
    highlight: {
        curriculumGoals: {},
        tracks: {},
        courses: {}
    }
});

export default store;