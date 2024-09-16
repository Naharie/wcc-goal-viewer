import produce from "immer";
import create from "zustand";
import { CourseGoalReference, JsonData, TrackGoalReference } from "./validation";
import { createCourseGoalHighlight, createCurriculumGoalHighlight, createCurriculumSubGoalHighlight, createTrackGoalHighlight, deleteCourseGoalHighlight, deleteCurriculumGoalHighlight, deleteCurriculumSubGoalHighlight, deleteTrackGoalHighlight, prepareHighlight, swapCourseGoalHighlights, swapCurriculumGoalHighlights, swapCurriculumSubGoalHighlights, swapTrackGoalHighlights, useHighlight } from "./highlight";
import { createCourseGoalScores, createCurriculumGoalScores, createCurriculumSubGoalScores, createTrackGoalScores, deleteCourseGoalScores, deleteCurriculumGoalScores, deleteCurriculumSubGoalScores, deleteTrackGoalScores, prepareScores } from "./scores";
import swapGoals from "../utilities/swap-goals";
import nextGoalId from "../utilities/goal-id";
import { nextLowercaseLetter, nextUppercaseLetter } from "../utilities/alphabet";
import { nextRomanNumeral } from "../utilities/roman-numerals";

export interface DataSlice extends JsonData
{
    set(data: JsonData): void;

    addCurriculumGoal: () => void;
    addCurriculumSubGoal: (parent: number) => void;
    addTrackGoal: (track: number) => void;
    addCourseGoal: (course: number, year: number, semester: number) => void;

    swapCurriculumGoalReferences: (a: string, b: string) => void;
    swapCurriculumSubGoalReferences: (parent: string, a: string, b: string) => void;
    swapTrackGoalReferences: (track: string, a: string, b: string) => void;

    swapCurriculumGoals: (a: string, b: string) => void;
    swapCurriculumSubGoals: (parent: number) => (a: string, b: string) => void;
    swapTrackGoals: (track: number) => (a: string, b: string) => void;
    swapCourseGoals: (course: number, year: number, semester: number) => (a: string, b: string) => void;

    deleteCurriculumGoal: (goal: number) => void;
    deleteCurriculumSubGoal: (parent: number, child: number) => void;
    deleteTrackGoal: (track: number, goal: number) => void;
    deleteCourseGoal: (course: number, year: number, semester: number, goal: number) => void;

    updateCurriculumGoal: (goal: number, text: string) => void;
    updateCurriculumSubGoal: (parent: number, child: number, text: string) => void;
    updateTrackGoal: (track: number, goal: number, text: string, references: TrackGoalReference[]) => void;
    updateCourseGoal: (course: number, year: number, semester: number, goal: number, text: string, references: CourseGoalReference[]) => void;
}

export const useData = create<DataSlice>((set, get) => ({
    curriculumGoals: [],
    tracks: [],
    courses: [],

    set: data =>
    {
        set(data);
        prepareHighlight(data);
        prepareScores(data);
    },

    addCurriculumGoal: () =>
    {
        set(data => produce(data, data =>
        {
            const goals = data.curriculumGoals;
            const id = nextGoalId();    
            const ref = goals.length === 0 ? "I" : nextRomanNumeral(goals[goals.length - 1].ref);
    
            goals.push({
                text: "== PLACEHOLDER ==",
                id, ref,
                children: []
            });
    
            createCurriculumGoalScores(ref);
            createCurriculumGoalHighlight(ref);
        }));
    },
    addCurriculumSubGoal: index =>
    {
        set(data => produce(data, data =>
        {
            const parent = data.curriculumGoals[index];
            const id = nextGoalId();    
            const ref = parent.children.length === 0 ? "a" : nextLowercaseLetter(parent.children[parent.children.length - 1].ref);
    
            parent.children.push({
                text: "== PLACEHOLDER ==",
                id, ref
            });;
    
            createCurriculumSubGoalScores(parent.ref, ref);
            createCurriculumSubGoalHighlight(parent.ref, ref);
        }));
    },
    addTrackGoal: index =>
    {
        set(data => produce(data, data =>
        {
            const track = data.tracks[index];

            const id = nextGoalId();
            const ref = (track.goals.length + 1).toString();

            track.goals.push({
                text: "== PLACEHOLDER ==",
                id, ref,
                references: []
            });

            createTrackGoalScores(track.name, ref);        
            createTrackGoalHighlight(track.name, ref);
        }))
    },
    addCourseGoal: (courseIndex, year, semesterIndex) =>
    {
        set(data => produce(data, data =>
        {
            const course = data.courses[courseIndex];
            const semester = course.years[year].semesters[semesterIndex];
            const id = nextGoalId();
            const ref = semester.length === 0 ? "A" : nextUppercaseLetter(semester[semester.length - 1].ref);
    
            semester.push({
                text: "== PLACEHOLDER ==",
                id, ref,
                references: []
            });
    
            createCourseGoalScores(course.name, ref)
            createCourseGoalHighlight(course.name, ref);
        }));
    },

    swapCurriculumGoalReferences: (a, b) =>
    {
        set(data => produce(data, data =>
        {
            for (const track of data.tracks)
            {
                for (const goal of track.goals)
                {
                    for (const reference of goal.references)
                    {
                        if (reference.goal === a)
                        {
                            reference.goal = b;
                        }
                        else if (reference.goal === b)
                        {
                            reference.goal = a;
                        }
                    }
                }
            }
        }));
    },
    swapCurriculumSubGoalReferences: (parent, a, b) =>
    {
        set(data => produce(data, data =>
        {
            for (const track of data.tracks)
            {
                for (const goal of track.goals)
                {
                    for (const reference of goal.references)
                    {
                        if (reference.goal !== parent) continue;

                        if (!reference.subGoals) return;

                        for (let index = 0; index < reference.subGoals.length; index++)
                        {
                            if (reference.subGoals[index] === a)
                            {
                                reference.subGoals[index] = b;
                            }
                            else if (reference.subGoals[index] === b)
                            {
                                reference.subGoals[index] = a;
                            }
                        }
                    }
                }
            }
        }));
    },
    swapTrackGoalReferences: (track, a, b) =>
    {
        set(data => produce(data, data =>
        {
            const course = data.courses.find(({ name: course }) => course === track);
            if (course === undefined) return;
            
            for (const year of course.years)
            {
                for (const semester of year.semesters)
                {
                    for (const goal of semester)
                    {
                        for (let i = 0; i < goal.references.length; i++)
                        {
                            if (goal.references[i] === a)
                            {
                                goal.references[i] = b;
                            }
                            else if (goal.references[i] === b)
                            {
                                goal.references[i] = a;
                            }
                        }
                    }
                }
            }
        }))
    },

    swapCurriculumGoals: (a, b) =>
    {
        set(data => produce(data, data =>
        {
            const curriculumGoals = data.curriculumGoals;
            const [success, refA, refB] = swapGoals(curriculumGoals, a, b);

            if (!success) return;
            get().swapCurriculumGoalReferences(refA, refB);

            if (useHighlight.getState().lastHighlightedColumn === "curriculum")
            {
                swapCurriculumGoalHighlights(refA, refB);
            }
        }));
    },
    swapCurriculumSubGoals: parent => (a, b) =>
    {
        set(data => produce(data, data =>
        {
            const curriculumGoal = data.curriculumGoals[parent];
            const [success, refA, refB] = swapGoals(curriculumGoal.children, a, b);
        
            if (!success) return;
            
            get().swapCurriculumSubGoalReferences(curriculumGoal.ref, refA, refB);
            swapCurriculumSubGoalHighlights(curriculumGoal.ref, refA, refB);
        }));
    },
    swapTrackGoals: trackIndex => (a, b) =>
    {
        set(data => produce(data, data =>
        {
            const track = data.tracks[trackIndex];
            const [success, refA, refB] = swapGoals(track.goals, a, b);
                
            if (!success) return;

            get().swapTrackGoalReferences(track.name, refA, refB);
            swapTrackGoalHighlights(track.name, refA, refB);
        }))
    },
    swapCourseGoals: (courseNumber, year, semesterIndex) => (a, b) =>
    {
        set(data => produce(data, data =>
        {
            const course = data.courses[courseNumber];
            const semester = course.years[year].semesters[semesterIndex];
            const [success, refA, refB] = swapGoals(semester, a, b);
        
            if (!success) return;

            swapCourseGoalHighlights(course.name, refA, refB);
        }));
    },

    deleteCurriculumGoal: index =>
    {
        set(data => produce(data, data =>
        {
            const goal = data.curriculumGoals[index];
            data.curriculumGoals.splice(index, 1);
            
            deleteCurriculumGoalScores(goal.ref);
            deleteCurriculumGoalHighlight(goal.ref);
        }));
    },
    deleteCurriculumSubGoal: (parentIndex, index) =>
    {
        set(data => produce(data, data =>
        {
            const parent = data.curriculumGoals[parentIndex];
            const child = parent.children[index];

            parent.children.splice(index, 1);

            deleteCurriculumSubGoalScores(parent.ref, child.ref);
            deleteCurriculumSubGoalHighlight(parent.ref, child.ref);
        }));
    },
    deleteTrackGoal: (trackIndex, index) =>
    {
        set(data => produce(data, data =>
        {
            const track = data.tracks[trackIndex];
            const goal = track.goals[index];

            track.goals.splice(index, 1);

            deleteTrackGoalScores(track.name, goal.ref);
            deleteTrackGoalHighlight(track.name, goal.ref);
        }));
    },
    deleteCourseGoal: (courseIndex, year, semesterIndex, goalIndex) =>
    {
        set(data => produce(data, data =>
        {
            const course = data.courses[courseIndex];
            const semester = course.years[year].semesters[semesterIndex];
            const goal = semester[goalIndex];

            semester.splice(goalIndex, 1);
            deleteCourseGoalScores(course.name, goal.ref)
            deleteCourseGoalHighlight(course.name, goal.ref);
        }));
    },

    updateCurriculumGoal: (goal, text) =>
    {
        set(data => produce(data, data =>
        {
            data.curriculumGoals[goal].text = text;
        }));
    },
    updateCurriculumSubGoal: (parentIndex, index, text) =>
    {
        set(data => produce(data, data =>
        {
            data.curriculumGoals[parentIndex].children[index].text = text;
        }));
    },
    updateTrackGoal: (trackIndex, index, text, references) =>
    {
        set(data => produce(data, data =>
        {
            data.tracks[trackIndex].goals[index].text = text;
        }));
    },
    updateCourseGoal: (courseIndex, year, semester, goalIndex, text, references) =>
    {
        set(data => produce(data, data =>
        {
            data.courses[courseIndex].years[year].semesters[semester][goalIndex].text = text;
        }));
    }
}));

const state = useData.getState();

export const addCurriculumGoal = state.addCurriculumGoal;
export const addCurriculumSubGoal = state.addCurriculumSubGoal;
export const addTrackGoal = state.addTrackGoal;
export const addCourseGoal = state.addCourseGoal;

export const swapCurriculumGoals = state.swapCurriculumGoals;
export const swapCurriculumSubGoals = state.swapCurriculumSubGoals;
export const swapTrackGoals = state.swapTrackGoals;
export const swapCourseGoals = state.swapCourseGoals;

export const deleteCurriculumGoal = state.deleteCurriculumGoal;
export const deleteCurriculumSubGoal = state.deleteCurriculumSubGoal;
export const deleteTrackGoal = state.deleteTrackGoal;
export const deleteCourseGoal = state.deleteCourseGoal;

export const updateCurriculumGoal = state.updateCurriculumGoal;
export const updateCurriculumSubGoal = state.updateCurriculumSubGoal;
export const updateTrackGoal = state.updateTrackGoal;
export const updateCourseGoal = state.updateCourseGoal;