import useData from "../../..";
import useScores from "../../../scores";

const propagateScoresToCurriculumGoals = () =>
{
    const tracks = useData.getState().tracks;
    const update = useScores.getState().update;

    update (settableScores =>
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
    
                    for (const subGoal of reference.subGoals)
                    {
                        curriculumGoal.children[subGoal].push(...scores)
                    }
                }
            }
        }
    });
};

export default propagateScoresToCurriculumGoals;