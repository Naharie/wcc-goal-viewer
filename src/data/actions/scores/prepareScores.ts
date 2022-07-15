import { JsonData } from "../../validation";
import useScores, { CurriculumScore } from "../../scores";
import readScoresFromQuery from "./readFromQuery";

const prepareScores = (data: JsonData) =>
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

    useScores.getState().update(scores =>
    {
        scores.curriculumGoals = curriculumGoals;
        scores.tracks = tracks;
        scores.courses = courses;
    });

    readScoresFromQuery();
};

export default prepareScores;