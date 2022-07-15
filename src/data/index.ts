import produce from "immer";
import create from "zustand";
import { JsonData } from "./validation";

export interface DataSlice extends JsonData
{
    set(data: JsonData): void;
    update(setter: (slice: DataSlice) => void): void;
}

const useData = create<DataSlice>(set => ({
    curriculumGoals: [],
    tracks: [],
    courses: [],

    set: ({ curriculumGoals, tracks, courses }) => set({ curriculumGoals, tracks, courses }),
    update: (setter) => set(produce(setter))
}));

export default useData;