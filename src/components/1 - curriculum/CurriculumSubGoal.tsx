import { PropsWithChildren } from "react";
import useData from "../../data";
import deleteCurriculumSubGoal from "../../data/actions/data/deletion/curriculumSubGoal";
import toggleCurriculumSubGoalHighlight from "../../data/actions/highlight/toggle/curriculumSubGoalHighlight";
import useEditor from "../../data/editor";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import GoalBase from "../GoalBase";

interface CurriculumSubGoalProps
{
    parentIndex: number;
    index: number;
}

const CurriculumSubGoal = ({ parentIndex, index }: PropsWithChildren<CurriculumSubGoalProps>) =>
{
    const parent = useData(data => data.curriculumGoals[parentIndex]);
    const goal = parent.children[index];
    const score = useScores(scores =>  average(scores.curriculumGoals[parent.ref].children[goal.ref]));
    const highlighted = useHighlight(highlight => highlight.curriculumGoals[parent.ref][goal.ref]);

    const update = useData(data => data.update);
    const closeEditor = useEditor(editor => editor.closeEditor);

    const saveGoal = (text: string) =>
    {
        update(data =>
        {
            data.curriculumGoals[parentIndex].children[index].text = text;
        });
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
            onClick={toggleCurriculumSubGoalHighlight(parent.ref, goal.ref)}

            saveGoal={saveGoal}
            deleteGoal={deleteGoal}
        />
    );
};

export default CurriculumSubGoal;