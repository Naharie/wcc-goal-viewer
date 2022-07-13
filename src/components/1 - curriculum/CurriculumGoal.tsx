import { PropsWithChildren } from "react";
import useData from "../../data";
import swapCurriculumSubGoals from "../../data/actions/data/swap/curriculumSubGoals";
import useEditor from "../../data/editor";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
import GoalBase from "../GoalBase";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";
import toggleCurriculumGoalHighlight from "../../data/actions/highlight/toggle/curriculumGoalHighlight";

interface CurriculumGoalProps
{
    index: number;
}

const CurriculumGoal = ({ index,  }: PropsWithChildren<CurriculumGoalProps>) =>
{
    const goal = useData(data => data.curriculumGoals[index]);
    const dimmed = useEditor(editor => editor.id !== undefined);
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);
    const score = useScores(scores => average (scores.curriculumGoals[goal.ref].score));
    const highlighted = useHighlight(highlight => Object.values(highlight.curriculumGoals[goal.ref]).some(v => v));

    const subGoals =
        goal.children.map((goal, childIndex) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} parentIndex={index} index={childIndex} />
        }));

    return (
        <GoalBase goal={goal} highlighted={highlighted} score={score} className="m-1 mb-6" onClick={toggleCurriculumGoalHighlight(goal.ref)}>
            <SortableList
                className={"list-[lower-alpha] mt-1" + chooseBackground(false, dimmed)}
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                allowSorting={allowSorting}
                onSwap={swapCurriculumSubGoals(index)}
            />
        </GoalBase>
    );
};

export default CurriculumGoal;