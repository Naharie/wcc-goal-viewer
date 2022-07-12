import { PropsWithChildren } from "react";
import useCurriculumGoal from "../../data/views/1 - curriculum/useCurriculumGoal";
import chooseBackground from "../../utilities/choose-background";
import GoalBase from "../GoalBase";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";

interface CurriculumGoalProps
{
    index: number;
}

const CurriculumGoal = ({ index,  }: PropsWithChildren<CurriculumGoalProps>) =>
{
    const {
        goal, score,
        dimmed, allowSorting,
        highlighted, toggleHighlight,
        swapChildren
    } = useCurriculumGoal(index);

    const subGoals =
        goal.children.map((goal, childIndex) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} parentIndex={index} index={childIndex} />
        }));

    return (
        <GoalBase goal={goal} highlighted={highlighted} score={score} className="m-1 mb-6" onClick={toggleHighlight}>
            <SortableList
                className={"list-[lower-alpha] mt-1" + chooseBackground(false, dimmed)}
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                allowSorting={allowSorting}
                onSwap={swapChildren}
            />
        </GoalBase>
    );
};

export default CurriculumGoal;