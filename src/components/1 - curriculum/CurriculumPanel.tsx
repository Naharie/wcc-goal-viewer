import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import store from "../../data";
import { useSnapshot } from "valtio";
import SortableList from "../sortable/SortableList";
import { computeCurriculumToTrackHighlighting, swapCurriculumGoalReferences } from "../../data/highlight";
import swapGoals from "../../utilities/swap-goals";

const CurriculumPanel = () =>
{
    const view = useSnapshot(store);

    const goals =
        view.data.curriculumGoals.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumGoal key={goal.id} goal={index} />
        }));

    const dimmed = view.editorId !== undefined;

    const handleSwap = (a: string, b: string) =>
    {
        const curriculumGoals = store.data.curriculumGoals;

        const [success, refA, refB] = swapGoals(curriculumGoals, a, b);

        if (success)
        {
            swapCurriculumGoalReferences(refA, refB);
        }
        if (store.lastHighlightedColumn === "curriculum")
        {
            computeCurriculumToTrackHighlighting();
        }
    };

    return (
        <SimpleBar className={"max-h-full pr-4 pb-4" + (dimmed ? " bg-dim-not-selected" : "")}>
            <SortableList
                className="pr-1 list-[upper-roman] ml-12 my-8"
                dragId="curriculum-goals"
                lockXAxis
                allowSorting={view.editorEnabled && view.editorId === undefined}
                items={goals}
                onSwap={handleSwap}
            />
        </SimpleBar>
    );
};

export default CurriculumPanel;