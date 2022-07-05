import { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { computeCurriculumToTrackHighlighting, swapCurriculumSubGoalReferences } from "../../data/highlight";
import { average } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
import swapGoals from "../../utilities/swap-goals";
import GoalBase from "../GoalBase";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";

interface CurriculumGoalProps
{
    goal: number;
}

const CurriculumGoal = ({ goal: index,  }: PropsWithChildren<CurriculumGoalProps>) =>
{
    const view = useSnapshot(store);

    const goal = view.data.curriculumGoals[index];
    const highlighted = Object.values(view.highlight.curriculumGoals[goal.ref]).some(v => v);
    const dimmed = view.editorId != undefined && view.editorId != goal.id;

    const subGoals =
        goal.children.map((goal, childIndex) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} curriculumGoal={index} subGoal={childIndex} />
        }));
    const score = average(view.scores.curriculumGoals[goal.ref].score);

    const toggleHighlight = () =>
    {
        const highlight = store.highlight.curriculumGoals[goal.ref];

        for (const key in highlight)
        {
            highlight[key] = !highlighted;
        }

        store.lastHighlightedColumn = "curriculum";
        computeCurriculumToTrackHighlighting();
    };
    const handleSwap = (a: string, b: string) =>
    {
        const curriculumGoal = store.data.curriculumGoals[index];
        const children = curriculumGoal.children;

        const [success, refA, refB] = swapGoals(children, a, b);

        if (success)
        {
            swapCurriculumSubGoalReferences(curriculumGoal.ref, refA, refB);
        }
    };

    return (
        <GoalBase goal={goal} highlighted={highlighted} score={score} className="m-1 mb-6" onClick={toggleHighlight}>
            <SortableList
                className={"list-[lower-alpha] mt-1" + chooseBackground(false, dimmed)}
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                allowSorting={view.editorEnabled && view.editorId === undefined}
                onSwap={handleSwap}
            />
        </GoalBase>
    );
};

export default CurriculumGoal;