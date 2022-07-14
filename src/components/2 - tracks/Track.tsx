import useData from "../../data";
import addTrackGoal from "../../data/actions/data/addition/trackGoal";
import swapTrackGoals from "../../data/actions/data/swap/swapTrackGoals";
import useEditor from "../../data/editor";
import SortableList from "../sortable/SortableList";
import TrackGoal from "./TrackGoal";

const Track = ({ track: index }: { track: number }) =>
{
    const editorEnabled = useEditor(editor => editor.enabled);

    const track = useData(data => data.tracks[index]);    
    const allowSorting = useEditor(editor => editor.enabled && editor.id === undefined);

    const goals =
        track.goals.map((goal, goalIndex) =>
        ({
            id: goal.id.toString(),
            value: <TrackGoal key={goal.id} trackIndex={index} index={goalIndex} />
        }));

    const addGoal = () => addTrackGoal(index);

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.name}</a>
            <SortableList
                className="list-decimal"
                dragId={"track-" + track.name}
                lockXAxis
                allowSorting={allowSorting}
                items={goals}
                onSwap={swapTrackGoals(index)}
            />
            {editorEnabled ?
                <div className="flex justify-center items-center pt-2 pb-6">
                    <button className="w-full bg-gray-400 hover:bg-gray-500 rounded-md text-center" onClick={addGoal}>+</button>
                </div> :
            null}
        </div>
    );
};

export default Track;