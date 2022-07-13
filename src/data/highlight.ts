import produce from "immer";
import create from "zustand";

export interface HighlightSlice
{
    curriculumGoals: Record<string, Record<string, boolean>>;
    tracks: Record<string, Record<string, boolean>>;
    courses: Record<string, Record<string, boolean>>;

    lastHighlightedColumn: "curriculum" | "tracks";

    update(setter: (slice: HighlightSlice) => void): void;
}

const useHighlight = create<HighlightSlice>((set, get) => ({
    curriculumGoals: {},
    tracks: {},
    courses: {},

    lastHighlightedColumn: "curriculum",

    update: (setter) => set(produce(setter))
}));

export default useHighlight;