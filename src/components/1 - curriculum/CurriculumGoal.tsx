import React, { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { computeCurriculumToTrackHighlighting, swapCurriculumSubGoalReferences } from "../../data/highlight";
import { average } from "../../data/scores";
import ScoreBadge from "../scores/ScoreBadge";
import SortableList from "../sortable/SortableList";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ goal: index }: PropsWithChildren<{ goal: number }>) =>
{
    const view = useSnapshot(store);

    const goal = view.data.curriculumGoals[index];
    const highlighted = Object.values(view.highlight.curriculumGoals[goal.ref]).some(v => v);

    const subGoals =
        goal.children.map((goal, childIndex) => ({
            id: goal.id.toString(),
            value: <CurriculumSubGoal key={goal.id} curriculumGoal={index} subGoal={childIndex} />
        }));
    const score = average(view.scores.curriculumGoals[goal.ref].score);

    const toggleHighlight = (event: React.MouseEvent<HTMLLIElement>) =>
    {
        if (event.target !== event.currentTarget) return;

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
        const children= curriculumGoal.children;

        const indexA = children.findIndex(goal => goal.id.toString() === a);
        const indexB = children.findIndex(goal => goal.id.toString() === b);

        if (indexA === -1 || indexB === -1) return;

        const [goalA, goalB] = [children[indexA], children[indexB]];
        const [refA, refB] = [goalA.ref, goalB.ref];
        
        [goalA.ref, goalB.ref] = [ refB, refA ];
        swapCurriculumSubGoalReferences(curriculumGoal.ref, refA, refB);

        children[indexA] = goalB;
        children[indexB] = goalA;
    };

    return (
        <li className={"m-1 mb-6 list-item rounded-md" + (highlighted ? " bg-selected" : "")} onClick={toggleHighlight}>
            {goal.text}
            {score > -1 ? <ScoreBadge className="ml-3" value={score} /> : null}
            <SortableList
                className="list-[lower-alpha] mt-1 bg-not-selected"
                dragId={"curriculum-goal-" + goal.id}
                items={subGoals}
                lockXAxis
                onSwap={handleSwap}
            />
        </li>
    );
};

export default CurriculumGoal;