import { JsonData } from "../../../validation";

const swapCurriculumSubGoalReferences = (data: JsonData, goalRef: string, refA: string, refB: string) =>
{
    for (const track of data.tracks)
    {
        for (const goal of track.goals)
        {
            for (const reference of goal.references)
            {
                if (reference.goal !== goalRef) continue;

                if (!reference.subGoals) return;

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

export default swapCurriculumSubGoalReferences;