import { proxy } from "valtio";
import { GoalData } from "./types";

export interface Highlight
{
    curriculumGoals: Record<string, Record<string, boolean>>;
    tracks: Record<string, Record<string, boolean>>;
    courses: Record<string, Record<string, boolean>>;
}

export interface CurriculumScore
{
    score: number[];
    children: Record<string, number[]>;
}

export interface Scores
{
    curriculumGoals: Record<string, CurriculumScore>;
    tracks: Record<string, Record<string, number[]>>;
    courses: Record<string, Record<string, number[]>>;
}

export interface Store
{
    isLoaded: boolean;
    errorMessage: string | null;

    data: GoalData;
    highlight: Highlight;
    lastHighlightedColumn: "curriculum" | "tracks";
    scores: Scores;

    editorEnabled: boolean;
    editorId?: number;
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
    },
    lastHighlightedColumn: "curriculum",
    scores: {
        curriculumGoals: {},
        tracks: {},
        courses: {}
    },

    editorEnabled: false
});

export default store;