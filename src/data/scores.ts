import store, { CurriculumScore } from ".";
import { getQuery, setQueryParameter } from "../utilities/query-parameter";
import { GoalData } from "./types";

export const average = (numbers: readonly number[]) =>
{
    if (numbers.length === 0)
    {
        return -1;
    }

    const raw = numbers.reduce((a, b) => a + b) / numbers.length;
    const parts = raw.toString().split(".");

    if (parts.length === 1)
    {
        return raw;
    }
    else
    {
        return parseFloat(parts[0] + "." + parts[1].substring(0, 2));
    }
}

export const readScoresFromQuery = () =>
{
    const query = getQuery();
    const scores = query["scores"];

    if (scores === undefined) return;

    const courses = scores.split("|").map(course => course.split("@"));
    if (courses.length === 0) return;

    for (const [name, course] of courses)
    {
        for (const [goal, values] of course.split(",").map(goal => goal.split(":")))
        {
            store.scores.courses[name][goal] = values.split("").map(v => parseInt(v));
        }
    }

    propagateScores();
};

export const prepareScores = (data: GoalData) =>
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

        tracks[track.track] = scores;
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

        courses[course.course] = scores;
    }

    store.scores = { curriculumGoals, tracks, courses };
    readScoresFromQuery();
};

export const clearPropagatedScores = () =>
{
    const data = store.data;
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

        tracks[track.track] = scores;
    }

    store.scores.curriculumGoals = curriculumGoals;
    store.scores.tracks = tracks;
};

export const propagateScoresToTracks = () =>
{
    for (const { course, years } of store.data.courses)
    {
        for (const { semesters } of years)
        {
            for (const semester of semesters)
            {
                for (const goal of semester)
                {
                    for (const reference of goal.references)
                    {
                        store.scores.tracks[course][reference].push(...store.scores.courses[course][goal.ref]);
                    }
                }
            }
        }
    }
};

export const propagateScoresToCurriculumGoals = () =>
{
    for (const { track, goals } of store.data.tracks)
    {
        for (const goal of goals)
        {
            for (const reference of goal.references)
            {
                const scores = store.scores.tracks[track][goal.ref];
                const curriculumGoal = store.scores.curriculumGoals[reference.goal];

                curriculumGoal.score.push(...scores);

                for (const subGoal of reference.subGoals)
                {
                    curriculumGoal.children[subGoal].push(...scores)
                }
            }
        }
    }
};

export const propagateScores = () =>
{
    clearPropagatedScores();
    propagateScoresToTracks();
    propagateScoresToCurriculumGoals();

    const scores =
        Object.entries(store.scores.courses).map(([name, course]) =>
        {
            const nested = Object.entries(course).filter(([, scores]) => scores.length > 0).map (([goal, scores]) => goal + ":" + scores.join("")).join(",");
            return name + "@" + nested;
        }).filter(value => !value.endsWith("@")).join("|");

    setQueryParameter("scores", scores);
};

window.addEventListener("popstate", () => readScoresFromQuery());