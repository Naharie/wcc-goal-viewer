import store, { Highlight } from ".";
import { GoalData } from "./types";

export const prepareHighlight = (data: GoalData) =>
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

        curriculumGoals[goal.ref] = highlight;
    }

    for (const track of data.tracks)
    {
        const highlight: Record<string, boolean> = {};

        for (const goal of track.goals)
        {
            highlight[goal.ref] = false;
        }

        tracks[track.track] = highlight;
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

        courses[course.course] = highlight;
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

    for (const { track, goals } of store.data.tracks)
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

    for (const { course, years } of store.data.courses)
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