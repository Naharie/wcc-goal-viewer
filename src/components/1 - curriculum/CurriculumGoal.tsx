import { PropsWithChildren } from "react";
import { useEditor } from "../../data/editor";
import { toggleCurriculumGoalHighlight, useCurriculumGoalHighlight } from "../../data/highlight";
import chooseBackground from "../../utilities/choose-background";
import GoalBase from "../GoalBase";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";
import useClick from "../../hooks/useClick";
import average from "../../utilities/average";
import { useCurriculumGoalScores } from "../../data/scores";
import { addCurriculumSubGoal, deleteCurriculumGoal, swapCurriculumSubGoals, updateCurriculumGoal, useData } from "../../data";

interface CurriculumGoalProps
{
    index: number;
}

const CurriculumGoal = ({ index }: PropsWithChildren<CurriculumGoalProps>) =>
{
    const goal = useData(data => data.curriculumGoals[index]);

    const editorEnabled = useEditor(editor => editor.enabled);
    const dimmed = useEditor(editor => editor.id !== undefined && editor.id !== goal.id);

    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);
    const score = average(useCurriculumGoalScores(goal.ref));
    const highlighted = useCurriculumGoalHighlight(goal.ref);

    const closeEditor = useEditor(editor => editor.closeEditor);

    const subGoals =
        goal.children.map((goal, childIndex) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} parentIndex={index} index={childIndex} />
        }));

    const addGoal = () => !dimmed && addCurriculumSubGoal(index);
    const saveGoal = (text: string) =>
    {
        updateCurriculumGoal(index, text);
        closeEditor();
    };
    const deleteGoal = () =>
    {
        deleteCurriculumGoal(index);
        closeEditor();
    };

    const [mouseDown, mouseUp] = useClick(addGoal);

    return (
        <GoalBase
            goal={goal}
            highlighted={highlighted}
            score={score}
            className="m-1 mb-6"
            onClick={() => toggleCurriculumGoalHighlight(goal.ref)}

            saveGoal={saveGoal}
            deleteGoal={deleteGoal}
        >
            <SortableList
                className={"list-[lower-alpha] mt-1" + chooseBackground(false, dimmed)}
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                allowSorting={allowSorting}
                onSwap={swapCurriculumSubGoals(index)}
            />
            {editorEnabled ?
                <div className="flex justify-center items-center pt-2 pb-6">
                    <button className={`
                        w-full
                        ${dimmed ? "bg-gray-600" : "bg-gray-400"}
                        hover:bg-gray-500
                        rounded-md text-center
                    `}
                        onMouseDown={mouseDown}
                        onMouseUp={mouseUp}
                    >+</button>
                </div> :
            null}
        </GoalBase>
    );
};

export default CurriculumGoal;