import useData from "../../..";
import useScores, { CurriculumScore } from "../../../scores";

const clearPropagatedScores = () =>
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

    useScores.getState().update(scores =>
    {
        scores.curriculumGoals = curriculumGoals;
        scores.tracks = tracks;
    });
};

export default clearPropagatedScores;