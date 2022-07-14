import useData from "../../..";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const deleteCurriculumGoal = (index: number) =>
{
    useData.getState().update(data =>
    {
        const goal = data.curriculumGoals[index];

        data.curriculumGoals.splice(index, 1);

        useScores.getState().update(scores =>
        {
            delete scores.curriculumGoals[goal.ref];
        });
        useHighlight.getState().update(highlight =>
        {
            delete highlight.curriculumGoals[goal.ref];
        });
    });

};

export default deleteCurriculumGoal;