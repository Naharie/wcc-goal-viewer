import { JsonData } from "../../../json";

const swapCurriculumGoalReferences = (data: JsonData, refA: string, refB: string) =>
{
    for (const track of data.tracks)
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

export default swapCurriculumGoalReferences;