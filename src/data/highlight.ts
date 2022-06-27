import store from ".";
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