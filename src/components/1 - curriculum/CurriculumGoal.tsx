import { PropsWithChildren } from "react";
import { useSnapshot } from "valtio";
import store from "../../data";
import { computeCurriculumToTrackHighlighting } from "../../data/highlight";
import CurriculumSubGoal from "./CurriculumSubGoal";

const CurriculumGoal = ({ goal: index }: PropsWithChildren<{ goal: number }>) =>
{
    const view = useSnapshot(store);

    const goal = view.data.curriculumGoals[index];
    const highlighted = Object.values(view.highlight.curriculumGoals[goal.ref]).some(v => v);

    const toggleHighlight = () =>
    {
        const highlight = store.highlight.curriculumGoals[goal.ref];

        for (const key in highlight)
        {
            highlight[key] = !highlighted;
        }

        computeCurriculumToTrackHighlighting();
    };

    return (
        <li className={"m-1 mb-6 list-item rounded-md" + (highlighted ? " bg-selected" : "")} onClick={toggleHighlight}>
            {goal.text}
            <ol className="list-[lower-alpha] mt-1 bg-not-selected">
                {
                    goal.children.map((goal, childIndex) =>
                        <CurriculumSubGoal key={goal.id} curriculumGoal={index} subGoal={childIndex} />
                    )
                }
            </ol>
        </li>
    );
};

export default CurriculumGoal;