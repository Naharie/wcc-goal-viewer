import produce from "immer";
import create from "zustand";
import { JsonData } from "./validation";
import { useData } from ".";

export interface HighlightSlice
{
    curriculumGoals: Record<string, Record<string, boolean>>;
    tracks: Record<string, Record<string, boolean>>;
    courses: Record<string, Record<string, boolean>>;

    lastHighlightedColumn: "curriculum" | "tracks";

    prepareHighlight: (data: JsonData) => void;
    clearCurriculumHighlight: () => void;

    propagateCurriculumHighlighting: () => void;
    propagateTrackHighlighting: () => void;

    createCurriculumGoalHighlight: (goal: string) => void;
    createCurriculumSubGoalHighlight: (parent: string, child: string) => void;
    createTrackGoalHighlight: (track: string, goal: string) => void;
    createCourseGoalHighlight: (course: string, goal: string) => void;

    toggleCurriculumGoalHighlight: (goal: string) => void;
    toggleCurriculumSubGoalHighlight: (parent: string, child: string) => void;
    toggleTrackGoalHighlight: (track: string, goal: string) => void;

    swapCurriculumGoalHighlights: (a: string, b: string) => void;
    swapCurriculumSubGoalHighlights: (parent: string, a: string, b: string) => void;
    swapTrackGoalHighlights: (track: string, a: string, b: string) => void;
    swapCourseGoalHighlights: (course: string, a: string, b: string) => void;

    deleteCurriculumGoalHighlight: (goal: string) => void;
    deleteCurriculumSubGoalHighlight: (parent: string, child: string) => void;
    deleteTrackGoalHighlight: (track: string, goal: string) => void;
    deleteCourseGoalHighlight: (course: string, goal: string) => void;
}

export const useHighlight = create<HighlightSlice>((set, get) => ({
    curriculumGoals: {},
    tracks: {},
    courses: {},

    lastHighlightedColumn: "curriculum",

    prepareHighlight: (data: JsonData) =>
    {
        const curriculumGoals: Record<string, Record<string, boolean>> = {};
        const tracks: Record<string, Record<string, boolean>> = {};
        const courses: Record<string, Record<string, boolean>> = {};
    
        for (const goal of data.curriculumGoals)
        {
            const highlight: Record<string, boolean> = {};
    
            for (const child of goal.children)
            {
                highlight[child.ref] = false;
            }
    
            highlight.self = false;
            curriculumGoals[goal.ref] = highlight;
        }
    
        for (const track of data.tracks)
        {
            const highlight: Record<string, boolean> = {};
    
            for (const goal of track.goals)
            {
                highlight[goal.ref] = false;
            }
    
            tracks[track.name] = highlight;
        }
    
        for (const course of data.courses)
        {
            const highlight: Record<string, boolean> = {};
    
            for (const year of course.years)
            {
                for (const semester of year.semesters)
                {
                    for (const goal of semester)
                    {
                        highlight[goal.ref] = false;
                    }
                }
            }
    
            courses[course.name] = highlight;
        }

        set({ curriculumGoals, tracks, courses });
    },
    clearCurriculumHighlight: () =>
    {
        set(highlight => produce(highlight, highlight =>
        {
            for (const goalId in highlight.curriculumGoals)
            {
                for (const childId in highlight.curriculumGoals[goalId])
                {
                    highlight.curriculumGoals[goalId][childId] = false;
                }
            }
        }));
    },

    propagateCurriculumHighlighting: () =>
    {
        const tracks = useData.getState().tracks;
    
        set(highlight => produce (highlight, highlight =>
        {
            const curriculumHighlight = highlight.curriculumGoals;
    
            for (const { name: track, goals } of tracks)
            {
                for (const goal of goals)
                {
                    highlight.tracks[track][goal.ref] = goal.references.some(
                        ref =>
                            ref.subGoals?.length ?? 0 > 0 ?
                                ref.subGoals?.some(subGoalRef => curriculumHighlight[ref.goal][subGoalRef]) ?? false :
                                Object.values(curriculumHighlight[ref.goal]).some(v => v)
                    );
                }
            }
        }));
    
        get().propagateTrackHighlighting();
    },
    propagateTrackHighlighting: () =>
    {
        const courses = useData.getState().courses;
    
        set(highlight => produce (highlight, highlight =>
        {
            const trackHighlight = highlight.tracks;
    
            for (const { name: course, years } of courses)
            {
                for (const { semesters } of years)
                {
                    for (const semester of semesters)
                    {
                        for (const goal of semester)
                        {
                            highlight.courses[course][goal.ref] = goal.references.some(
                                reference => trackHighlight[course][reference]
                            );
                        }
                    }
                }
            }
        }));
    },

    createCurriculumGoalHighlight: goal => set(h => produce(h, highlight => { highlight.curriculumGoals[goal] = { self: false }; })),
    createCurriculumSubGoalHighlight: (parent, child) => set(h => produce(h, highlight => { highlight.curriculumGoals[parent][child] = false; })),
    createTrackGoalHighlight: (track, goal) => set(h => produce(h, highlight => { highlight.tracks[track][goal] = false; })),
    createCourseGoalHighlight: (course, goal) => set(h => produce(h, highlight => { highlight.courses[course][goal] = false; })),

    toggleCurriculumGoalHighlight: (ref: string) =>
    {
        const highlighted = Object.values(get().curriculumGoals[ref]).some(v => v);
    
        set(highlight => produce(highlight, highlight =>
        {
            const goalHighlight = highlight.curriculumGoals[ref];
    
            for (const key in goalHighlight)
            {
                goalHighlight[key] = !highlighted;
            }
        
            highlight.lastHighlightedColumn = "curriculum";
        }));
    
        get().propagateCurriculumHighlighting();
    },
    toggleCurriculumSubGoalHighlight: (parent: string, child: string) =>
    {
        set(highlight => produce(highlight, highlight =>
        {
            highlight.curriculumGoals[parent][child] = !highlight.curriculumGoals[parent][child];
            highlight.lastHighlightedColumn = "curriculum";
        }));
    
        get().propagateCurriculumHighlighting();
    },
    toggleTrackGoalHighlight: (track: string, goal: string) =>
    {
        const highlighted = get().tracks[track][goal];

        set(highlight => produce(highlight, highlight =>
        {
            highlight.tracks[track][goal] = !highlighted;
            highlight.lastHighlightedColumn = "tracks";
        }));
    
        get().clearCurriculumHighlight();
        get().propagateTrackHighlighting();
    },

    swapCurriculumGoalHighlights: (a, b) =>
    {
        set(h => produce(h, highlight =>
        { 
            const [highlightA, highlightB] = [ highlight.curriculumGoals[a], highlight.curriculumGoals[b] ];
            [ highlight.curriculumGoals[a], highlight.curriculumGoals[b] ] = [highlightB, highlightA];
        }));
    },
    swapCurriculumSubGoalHighlights: (parent, a, b) =>
    {
        set(h => produce(h, highlight =>
        { 
            const [highlightA, highlightB] = [ highlight.curriculumGoals[parent][a], highlight.curriculumGoals[parent][b] ];
            [ highlight.curriculumGoals[parent][a], highlight.curriculumGoals[parent][b] ] = [highlightB, highlightA];
        }));
    },
    swapTrackGoalHighlights: (track, a, b) =>
    {
        set(h => produce(h, highlight =>
        { 
            const [highlightA, highlightB] = [ highlight.tracks[track][a], highlight.tracks[track][b] ];
            [ highlight.tracks[track][a], highlight.tracks[track][b] ] = [highlightB, highlightA];
        }));
    },
    swapCourseGoalHighlights: (course, a, b) =>
    {
        set(h => produce(h, highlight =>
        { 
            const [highlightA, highlightB] = [ highlight.courses[course][a], highlight.courses[course][b] ];
            [ highlight.courses[course][a], highlight.courses[course][b] ] = [highlightB, highlightA];
        }));
    },

    deleteCurriculumGoalHighlight: goal => set(highlight => produce(highlight, highlight => { delete highlight.curriculumGoals[goal]; })),
    deleteCurriculumSubGoalHighlight: (parent, child) => set(highlight => produce(highlight, highlight => { delete highlight.curriculumGoals[parent][child]; })),
    deleteTrackGoalHighlight: (track, goal) => set(highlight => produce(highlight, highlight => { delete highlight.tracks[track][goal]; })),
    deleteCourseGoalHighlight: (course, goal) => set(highlight => produce(highlight, highlight => { delete highlight.courses[course][goal]; }))
}));

// Selectors

export const useCurriculumGoalHighlight = (goal: string) => useHighlight(highlight => Object.values(highlight.curriculumGoals[goal]).some(v => v));
export const useCurriculumSubGoalHighlight = (parent: string, child: string) => useHighlight(highlight => highlight.curriculumGoals[parent][child]);
export const useTrackGoalHighlight = (track: string, goal: string) => useHighlight(highlight => highlight.tracks[track][goal]);
export const useCourseGoalHighlight = (course: string, goal: string) => useHighlight(highlight => highlight.courses[course][goal]);

// Actions

const state = useHighlight.getState();

export const prepareHighlight = state.prepareHighlight;

export const propagateCurriculumHighlighting = state.propagateCurriculumHighlighting;
export const propagateTrackHighlighting = state.propagateTrackHighlighting;

export const createCurriculumGoalHighlight = state.createCurriculumGoalHighlight;
export const createCurriculumSubGoalHighlight = state.createCurriculumSubGoalHighlight;
export const createTrackGoalHighlight = state.createTrackGoalHighlight;
export const createCourseGoalHighlight = state.createCourseGoalHighlight;

export const toggleCurriculumGoalHighlight = state.toggleCurriculumGoalHighlight;
export const toggleCurriculumSubGoalHighlight = state.toggleCurriculumSubGoalHighlight;
export const toggleTrackGoalHighlight = state.toggleTrackGoalHighlight;

export const swapCurriculumGoalHighlights = state.swapCurriculumGoalHighlights;
export const swapCurriculumSubGoalHighlights = state.swapCurriculumSubGoalHighlights;
export const swapTrackGoalHighlights = state.swapTrackGoalHighlights;
export const swapCourseGoalHighlights = state.swapCourseGoalHighlights;

export const deleteCurriculumGoalHighlight = state.deleteCurriculumGoalHighlight;
export const deleteCurriculumSubGoalHighlight = state.deleteCurriculumSubGoalHighlight;
export const deleteTrackGoalHighlight = state.deleteTrackGoalHighlight;
export const deleteCourseGoalHighlight = state.deleteCourseGoalHighlight;