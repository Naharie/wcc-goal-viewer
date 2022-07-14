import useData from "../../..";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const deleteCurriculumSubGoal = (parentIndex: number, index: number) =>
{
    useData.getState().update(data =>
    {
        const parent = data.curriculumGoals[parentIndex];
        const goal = parent.children[index];

        parent.children.splice(index, 1);

        useScores.getState().update(scores =>
        {
            delete scores.curriculumGoals[parent.ref].children[goal.ref];
        });
        useHighlight.getState().update(highlight =>
        {
            delete highlight.curriculumGoals[parent.ref][goal.ref];
        });
    });

};

export default deleteCurriculumSubGoal;