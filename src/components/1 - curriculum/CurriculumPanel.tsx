import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import SortableList from "../sortable/SortableList";
import useCurriculumGoals from "../../data/views/1 - curriculum/useCurriculumGoals";

const CurriculumPanel = () =>
{
    const { goals: curriculumGoals, swapChildren, ...view } = useCurriculumGoals();

    const goals =
        curriculumGoals.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumGoal key={goal.id} index={index} />
        }));

    return (
        <SimpleBar className={"max-h-full pr-4 pb-4" + (view.dimmed ? " bg-dim-not-selected" : "")}>
            <SortableList
                className="pr-1 list-[upper-roman] ml-12 my-8"
                dragId="curriculum-goals"
                lockXAxis
                allowSorting={view.allowSorting}
                items={goals}
                onSwap={swapChildren}
            />
        </SimpleBar>
    );
};

export default CurriculumPanel;