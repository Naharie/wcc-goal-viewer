import useHighlight from "../../highlight";

const clearCurriculumHighlight = () =>
{
    const update = useHighlight.getState().update;

    update (highlight =>
    {
        for (const goalId in highlight.curriculumGoals)
        {
            for (const childId in highlight.curriculumGoals[goalId])
            {
                highlight.curriculumGoals[goalId][childId] = false;
            }
        }
    });
};

export default clearCurriculumHighlight;