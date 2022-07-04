import React, { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { computeCurriculumToTrackHighlighting, swapCurriculumSubGoalReferences } from "../../data/highlight";
import { average } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
import swapGoals from "../../utilities/swap-goals";
import ScoreBadge from "../scores/ScoreBadge";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ goal: index }: PropsWithChildren<{ goal: number }>) =>
{
    const view = useSnapshot(store);

    const goal = view.data.curriculumGoals[index];
    const highlighted = Object.values(view.highlight.curriculumGoals[goal.ref]).some(v => v);
    const dimmed = view.editorId !== undefined && view.editorId != goal.id;

    const subGoals =
        goal.children.map((goal, childIndex) => ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} curriculumGoal={index} subGoal={childIndex} />
        }));
    const score = average(view.scores.curriculumGoals[goal.ref].score);

    const toggleHighlight = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.target !== event.currentTarget || dimmed) return;

        const highlight = store.highlight.curriculumGoals[goal.ref];

        for (const key in highlight)
        {
            highlight[key] = !highlighted;
        }

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
        <li className={"m-1 mb-6 list-item rounded-md" + chooseBackground(highlighted, dimmed)} onClick={toggleHighlight}>
            {goal.text}
            {score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
            <SortableList
                className={"list-[lower-alpha] mt-1" + chooseBackground(false, dimmed)}
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                allowSorting={view.editorEnabled && view.canDrag && view.editorId === undefined}
                onSwap={handleSwap}
            />
        </li>
    );
};

export default CurriculumGoal;