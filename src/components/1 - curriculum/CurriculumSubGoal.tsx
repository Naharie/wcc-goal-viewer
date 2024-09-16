import { useEditor } from "../../data/editor";
import GoalBase from "../GoalBase";
import { useCurriculumSubGoalScores } from "../../data/scores";
import average from "../../utilities/average";
import { toggleCurriculumSubGoalHighlight, useCurriculumSubGoalHighlight } from "../../data/highlight";
import { deleteCurriculumSubGoal, updateCurriculumSubGoal, useData } from "../../data";

interface CurriculumSubGoalProps
{
    parentIndex: number;
    index: number;
}

const CurriculumSubGoal = ({ parentIndex, index }: CurriculumSubGoalProps) =>
{
    const parent = useData(data => data.curriculumGoals[parentIndex]);
    const goal = parent.children[index];
    const score = average(useCurriculumSubGoalScores(parent.ref, goal.ref));
    const highlighted = useCurriculumSubGoalHighlight(parent.ref, goal.ref);

    const closeEditor = useEditor(editor => editor.closeEditor);

    const saveGoal = (text: string) =>
    {
        updateCurriculumSubGoal(parentIndex, index, text);
        closeEditor();
    };
    const deleteGoal = () =>
    {
        deleteCurriculumSubGoal(parentIndex, index);
        closeEditor();
    };

    return (
        <GoalBase
            goal={goal}
            highlighted={highlighted}
            score={score}
            
            className="mt-2"
            onClick={() => toggleCurriculumSubGoalHighlight(parent.ref, goal.ref)}

            saveGoal={saveGoal}
            deleteGoal={deleteGoal}
        />
    );
};

export default CurriculumSubGoal;