import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import SortableList from "../sortable/SortableList";
import useData from "../../data";
import useEditor from "../../data/editor";
import swapCurriculumGoals from "../../data/actions/data/swap/curriculumGoals";

const CurriculumPanel = () =>
{
    const curriculumGoals = useData(data => data.curriculumGoals);
    
    const dimmed = useEditor(editor => editor.id !== undefined);
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);

    const goals =
        curriculumGoals.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumGoal key={goal.id} index={index} />
        }));

    return (
        <SimpleBar className={"max-h-full pr-4 pb-4" + (dimmed ? " bg-dim-not-selected" : "")}>
            <SortableList
                className="pr-1 list-[upper-roman] ml-12 my-8"
                dragId="curriculum-goals"
                lockXAxis
                allowSorting={allowSorting}
                items={goals}
                onSwap={swapCurriculumGoals}
            />
        </SimpleBar>
    );
};

export default CurriculumPanel;