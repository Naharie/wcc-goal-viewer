import create from "zustand";
import { getQuery, setQueryParameter } from "../utilities/query-parameter";
import produce from "immer";
import { JsonData } from "./validation";
import { useData } from ".";

export interface CurriculumScore
{
    score: number[];
    children: Record<string, number[]>;
}

export interface ScoresStore
{
    curriculumGoals: Record<string, CurriculumScore>;
    tracks: Record<string, Record<string, number[]>>;
    courses: Record<string, Record<string, number[]>>;

    readScoresFromQuery: () => void;
    prepareScores: (data: JsonData) => void;

    clearPropagatedScores: () => void;
    propagateScoresToTracks: () => void;
    propagateScoresToCurriculumGoals: () => void;
    propagateScores: () => void;

    createCurriculumGoalScores: (goal: string) => void;
    createCurriculumSubGoalScores: (parent: string, child: string) => void;
    createTrackGoalScores: (track: string, goal: string) => void;
    createCourseGoalScores: (course: string, goal: string) => void;

    deleteCurriculumGoalScores: (goal: string) => void;
    deleteCurriculumSubGoalScores: (parent: string, child: string) => void;
    deleteTrackGoalScores: (track: string, goal: string) => void;
    deleteCourseGoalScores: (course: string, goal: string) => void;

    addCourseGoalScore: (course: string, goal: string) => void;
    deleteCourseGoalScore: (course: string, goal: string) => (index: number) => void;
    setCourseGoalScore: (course: string, goal: string) => (index: number) => (score: number) => void;
}

export const useScores = create<ScoresStore>((set, get) => ({
    curriculumGoals: {},
    tracks: {},
    courses: {},

    readScoresFromQuery: () =>
    {
        const query = getQuery();
        const scores = query["scores"]?.split(" ")?.join("");
    
        if (scores === undefined || scores === "") return;
    
        const courses = scores.split("|").map(course => course.split("@"));
        if (courses.length === 0) return;
    
        set(scores => produce(scores =>
        {
            for (const [name, course] of courses)
            {
                for (const [goal, values] of course.split(",").map(goal => goal.split(":")))
                {
                    scores.courses[name][goal] = values.split("").map(v => parseInt(v));
                }
            }
        })(scores));
        
    
        get().propagateScores();
    },
    prepareScores: data =>
    {
        const curriculumGoals: Record<string, CurriculumScore> = {};
        const tracks: Record<string, Record<string, number[]>> = {};
        const courses: Record<string, Record<string, number[]>> = {};
    
        for (const goal of data.curriculumGoals)
        {
            const scores: Record<string, number[]> = {};
    
            for (const child of goal.children)
            {
                scores[child.ref] = [];
            }
    
            curriculumGoals[goal.ref] = { score: [], children: scores };
        }
    
        for (const track of data.tracks)
        {
            const scores: Record<string, number[]> = {};
    
            for (const goal of track.goals)
            {
                scores[goal.ref] = [];
            }
    
            tracks[track.name] = scores;
        }
    
        for (const course of data.courses)
        {
            const scores: Record<string, number[]> = {};
    
            for (const year of course.years)
            {
                for (const semester of year.semesters)
                {
                    for (const goal of semester)
                    {
                        scores[goal.ref] = [];
                    }
                }
            }
    
            courses[course.name] = scores;
        }
    
        set({ curriculumGoals, tracks, courses })
        get().readScoresFromQuery();
    },

    clearPropagatedScores: () =>
    {
        const data = useData.getState();
    
        const curriculumGoals: Record<string, CurriculumScore> = {};
        const tracks: Record<string, Record<string, number[]>> = {};
    
        for (const goal of data.curriculumGoals)
        {
            const scores: Record<string, number[]> = {};
    
            for (const child of goal.children)
            {
                scores[child.ref] = [];
            }
    
            curriculumGoals[goal.ref] = { score: [], children: scores };
        }
        for (const track of data.tracks)
        {
            const scores: Record<string, number[]> = {};
    
            for (const goal of track.goals)
            {
                scores[goal.ref] = [];
            }
    
            tracks[track.name] = scores;
        }
    
        set({ curriculumGoals, tracks });
    },
    propagateScoresToTracks: () =>
    {
        const courses = useData.getState().courses;
    
        set(scores => produce(scores, scores =>
        {
            for (const { name: course, years } of courses)
            {
                for (const { semesters } of years)
                {
                    for (const semester of semesters)
                    {
                        for (const goal of semester)
                        {
                            for (const reference of goal.references)
                            {
                                scores.tracks[course][reference].push(...scores.courses[course][goal.ref]);
                            }
                        }
                    }
                }
            }
        }));
    },
    propagateScoresToCurriculumGoals: () =>
    {
        const tracks = useData.getState().tracks;
    
        set(scores => produce(scores, settableScores =>
        {
            for (const { name: track, goals } of tracks)
            {
                for (const goal of goals)
                {
                    for (const reference of goal.references)
                    {
                        const scores = settableScores.tracks[track][goal.ref];
                        const curriculumGoal = settableScores.curriculumGoals[reference.goal];
        
                        curriculumGoal.score.push(...scores);
        
                        for (const subGoal of reference.subGoals ?? [])
                        {
                            curriculumGoal.children[subGoal].push(...scores)
                        }
                    }
                }
            }
        }));
    },
    propagateScores: () =>
    {
        get().clearPropagatedScores();
        get().propagateScoresToTracks();
        get().propagateScoresToCurriculumGoals();
    
        const store = useScores.getState();
    
        const scores =
            Object.entries(store.courses).map(([name, course]) =>
            {
                const nested = Object.entries(course).filter(([, scores]) => scores.length > 0).map (([goal, scores]) => goal + ":" + scores.join("")).join(",");
                return name + "@" + nested;
            }).filter(value => !value.endsWith("@")).join("|");
    
        setQueryParameter("scores", scores);
    },

    createCurriculumGoalScores: goal => set(scores => produce(scores, scores => { scores.curriculumGoals[goal] = { score: [], children: {} }; })),
    createCurriculumSubGoalScores: (parent, child) => set(scores => produce(scores, scores => { scores.curriculumGoals[parent].children[child] = []; })),
    createTrackGoalScores: (track, goal) => set(scores => produce(scores, scores => { scores.tracks[track][goal] = []; })),
    createCourseGoalScores: (course, goal) => set(scores => produce(scores, scores => { scores.courses[course][goal] = []; })),

    deleteCurriculumGoalScores: goal => set(scores => produce(scores, scores => { delete scores.curriculumGoals[goal]; })),
    deleteCurriculumSubGoalScores: (parent, child) => set(scores => produce(scores, scores => { delete scores.curriculumGoals[parent].children[child]; })),
    deleteTrackGoalScores: (track, goal) => set(scores => produce(scores, scores => { delete scores.tracks[track][goal]; })),
    deleteCourseGoalScores: (course, goal) => set(scores => produce(scores, scores => { delete scores.courses[course][goal]; })),

    addCourseGoalScore: (course, goal) =>
    {
        set(scores => produce(scores, scores => { scores.courses[course][goal].push(0); }));
        get().propagateScores();
    },
    deleteCourseGoalScore: (course, goal) => index =>
    {
        set(scores => produce(scores, scores => { scores.courses[course][goal].splice(index, 1); }));
        get().propagateScores();
    },
    setCourseGoalScore: (course, goal) => index => score =>
    {
        set(scores => produce(scores, scores => { scores.courses[course][goal][index] = score; }));
        get().propagateScores();
    }
}));

const state = useScores.getState();

// Selectors

export const useCurriculumGoalScores = (goal: string) => useScores(scores => scores.curriculumGoals[goal].score);
export const useCurriculumSubGoalScores = (parentGoal: string, goal: string) => useScores(scores => scores.curriculumGoals[parentGoal].children[goal]);
export const useTrackGoalScores = (track: string, goal: string) => useScores(scores => scores.tracks[track][goal]);
export const useCourseGoalScores = (course: string, goal: string) => useScores(scores => scores.courses[course][goal]);

// Actions

export const readScoresFromQuery = state.readScoresFromQuery;
export const prepareScores = state.prepareScores;
export const propagateScores = state.propagateScores;

export const createCurriculumGoalScores = state.createCurriculumGoalScores;
export const createCurriculumSubGoalScores = state.createCurriculumSubGoalScores;
export const createTrackGoalScores = state.createTrackGoalScores;
export const createCourseGoalScores = state.createCourseGoalScores;

export const deleteCurriculumGoalScores = state.deleteCurriculumGoalScores;
export const deleteCurriculumSubGoalScores = state.deleteCurriculumSubGoalScores;
export const deleteTrackGoalScores = state.deleteTrackGoalScores;
export const deleteCourseGoalScores = state.deleteCourseGoalScores;

export const addCourseGoalScore = state.addCourseGoalScore;
export const deleteCourseGoalScore = state.deleteCourseGoalScore;
export const setCourseGoalScore = state.setCourseGoalScore;