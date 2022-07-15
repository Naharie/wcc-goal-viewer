import useHighlight from "../../highlight";
import { JsonData } from "../../validation";

const prepareHighlight = (data: JsonData) =>
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

    useHighlight.getState().update(highlight =>
    {
        highlight.curriculumGoals = curriculumGoals;
        highlight.tracks = tracks;
        highlight.courses = courses;
    })
};

export default prepareHighlight;