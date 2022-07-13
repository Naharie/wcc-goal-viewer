import produce from "immer";
import create from "zustand";
import readScoresFromQuery from "./actions/scores/readFromQuery";

export const average = (numbers: readonly number[]) =>
{
    if (numbers === undefined || numbers.length === 0)
    {
        return -1;
    }

    const raw = numbers.reduce((a, b) => a + b) / numbers.length;
    const parts = raw.toString().split(".");

    if (parts.length === 1)
    {
        return raw;
    }
    else
    {
        return parseFloat(parts[0] + "." + parts[1].substring(0, 2));
    }
}

export interface CurriculumScore
{
    score: number[];
    children: Record<string, number[]>;
}

export interface ScoresSlice
{
    curriculumGoals: Record<string, CurriculumScore>;
    tracks: Record<string, Record<string, number[]>>;
    courses: Record<string, Record<string, number[]>>;

    update(setter: (slice: ScoresSlice) => void): void;
}

const useScores = create<ScoresSlice>(set => ({
    curriculumGoals: {},
    tracks: {},
    courses: {},

    update: (setter) => set(produce(setter))
}));

export default useScores;

window.addEventListener("popstate", () => readScoresFromQuery());