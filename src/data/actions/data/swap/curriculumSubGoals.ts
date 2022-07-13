import useData from "../../..";
import swapGoals from "../../../../utilities/swap-goals";
import swapCurriculumSubGoalReferences from "../references/swapCurriculumSubGoal";

const swapCurriculumSubGoals = (index: number) => (idA: string, idB: string) =>
{
    const update = useData.getState().update;

    update(data =>
    {
        const curriculumGoal = data.curriculumGoals[index];
        const [success, refA, refB] = swapGoals(curriculumGoal.children, idA, idB);
    
        if (!success) return;
        swapCurriculumSubGoalReferences(data, curriculumGoal.ref, refA, refB);
    });
};

export default swapCurriculumSubGoals;