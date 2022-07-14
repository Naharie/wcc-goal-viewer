import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import SortableList from "../sortable/SortableList";
import useData from "../../data";
import useEditor from "../../data/editor";
import swapCurriculumGoals from "../../data/actions/data/swap/curriculumGoals";
import addCurriculumGoal from "../../data/actions/data/addition/curriculumGoal";

const CurriculumPanel = () =>
{
    const editorEnabled = useEditor(editor => editor.enabled);
    const dimmed = useEditor(editor => editor.id !== undefined);

    const curriculumGoals = useData(data => data.curriculumGoals);
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);

    const goals =
        curriculumGoals.map((goal, index) =>
        ({
            id: goal.id.toString(),
            value: <CurriculumGoal key={goal.id} index={index} />
        }));

    const addGoal = () =>
    {
        if (dimmed) return;
        addCurriculumGoal();
    };

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
            {editorEnabled ?
                <div className="flex justify-center items-center pt-2 pb-6">
                    <button className={`w-full ${dimmed ? "bg-gray-600" : "bg-gray-400"} hover:bg-gray-500 rounded-md text-center`} onClick={addGoal}>+</button>
                </div> :
            null}
        </SimpleBar>
    );
};

export default CurriculumPanel;