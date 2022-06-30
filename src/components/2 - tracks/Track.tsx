import { useSnapshot } from "valtio";
import store from "../../data";
import { swapTrackReferences } from "../../data/highlight";
import SortableList from "../sortable/SortableList";
import TrackGoal from "./TrackGoal";

const Track = ({ track: index }: { track: number }) =>
{
    const view = useSnapshot(store);
    const track = view.data.tracks[index];

    const goals =
        track.goals.map((goal, goalIndex) => ({
            id: goal.ref,
            value: <TrackGoal key={goal.id} track={index} goal={goalIndex} />
        }));

    const handleSwap = (a: string, b: string) => swapTrackReferences(track.track, a, b);

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.track}</a>
                <SortableList
                    className="list-decimal"
                    dragId={"track-" + track.track}
                    items={goals}
                    onSwap={handleSwap}
                />
        </div>
    );
};

export default Track;