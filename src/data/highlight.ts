import store from ".";
import { JsonData } from "./json";

export const prepareHighlight = (data: JsonData) =>
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

    store.highlight = { curriculumGoals, tracks, courses };
};

export const clearCurriculumHighlight = () =>
{
    const highlight = store.highlight;

    for (const goalId in highlight.curriculumGoals)
    {
        for (const childId in highlight.curriculumGoals[goalId])
        {
            store.highlight.curriculumGoals[goalId][childId] = false;
        }
    }
};

export const computeCurriculumToTrackHighlighting = () =>
{
    const curriculumHighlight = store.highlight.curriculumGoals;

    for (const { name: track, goals } of store.data.tracks)
    {
        for (const goal of goals)
        {
            store.highlight.tracks[track][goal.ref] = goal.references.some(
                ref =>
                    ref.subGoals.length > 0 ?
                        ref.subGoals.some(subGoalRef => curriculumHighlight[ref.goal][subGoalRef]) :
                        Object.values(curriculumHighlight[ref.goal]).some(v => v)
            );
        }
    }

    computeTrackToCourseHighlighting();
};

export const computeTrackToCourseHighlighting = () =>
{
    const trackHighlight = store.highlight.tracks;

    for (const { name: course, years } of store.data.courses)
    {
        for (const { semesters } of years)
        {
            for (const semester of semesters)
            {
                for (const goal of semester)
                {
                    store.highlight.courses[course][goal.ref] = goal.references.some(
                        reference => trackHighlight[course][reference]
                    );
                }
            }
        }
    }
};

// A set of functions used for the drag and drop functionality.

export const swapCurriculumGoalReferences = (refA: string, refB: string) =>
{
    for (const track of store.data.tracks)
    {
        for (const goal of track.goals)
        {
            for (const reference of goal.references)
            {
                if (reference.goal === refA)
                {
                    reference.goal = refB;
                }
                else if (reference.goal === refB)
                {
                    reference.goal = refA;
                }
            }
        }
    }
};
export const swapCurriculumSubGoalReferences = (goalRef: string, refA: string, refB: string) =>
{
    for (const track of store.data.tracks)
    {
        for (const goal of track.goals)
        {
            for (const reference of goal.references)
            {
                if (reference.goal !== goalRef) continue;

                for (let index = 0; index < reference.subGoals.length; index++)
                {
                    if (reference.subGoals[index] === refA)
                    {
                        reference.subGoals[index] = refB;
                    }
                    else if (reference.subGoals[index] === refB)
                    {
                        reference.subGoals[index] = refA;
                    }
                }
            }
        }
    }
};

export const swapTrackReferences = (track: string, refA: string, refB: string) =>
{
    const course = store.data.courses.find(({ name: course }) => course === track);
    if (course === undefined) return;
    
    for (const year of course.years)
    {
        for (const semester of year.semesters)
        {
            for (const goal of semester)
            {
                for (let i = 0; i < goal.references.length; i++)
                {
                    if (goal.references[i] === refA)
                    {
                        goal.references[i] = refB;
                    }
                    else if (goal.references[i] === refB)
                    {
                        goal.references[i] = refA;
                    }
                }
            }
        }
    }
};