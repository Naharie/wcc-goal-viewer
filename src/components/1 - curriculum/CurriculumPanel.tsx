import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import store from "../../data";
import { useSnapshot } from "valtio";
import SortableList from "../sortable/SortableList";
import { swapCurriculumGoalReferences } from "../../data/highlight";

const CurriculumPanel = () =>
{
    const view = useSnapshot(store);

    const goals =
        view.data.curriculumGoals.map((goal, index) => ({
            id: goal.id.toString(),
            value: <CurriculumGoal key={goal.id} goal={index} />
        }));

    const handleSwap = (a: string, b: string) =>
    {
        const curriculumGoals = store.data.curriculumGoals;

        const indexA = curriculumGoals.findIndex(goal => goal.id.toString() === a);
        const indexB = curriculumGoals.findIndex(goal => goal.id.toString() === b);

        if (indexA === -1 || indexB === -1) return;

        const [goalA, goalB] = [curriculumGoals[indexA], curriculumGoals[indexB]];
        const [refA, refB] = [goalA.ref, goalB.ref];
        
        [goalA.ref, goalB.ref] = [ refB, refA ];
        swapCurriculumGoalReferences(refA, refB);

        curriculumGoals[indexA] = goalB;
        curriculumGoals[indexB] = goalA;
    };

    return (
        <SimpleBar style={{ maxHeight: "100%", padding: "0 1em 1em 0" }}>
            <SortableList
                className="pr-1 list-[upper-roman] ml-12 my-8"
                dragId="curriculum-goals"
                lockXAxis
                items={goals}
                onSwap={handleSwap}
            />
        </SimpleBar>
    );
};

export default CurriculumPanel;