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
            id: goal.id.toString(),
            value: <TrackGoal key={goal.id} track={index} goal={goalIndex} />
        }));

    const handleSwap = (a: string, b: string) =>
    {
        const track = store.data.tracks[index];

        var i = track.goals.findIndex(goal => goal.id.toString() === a);
        var j = track.goals.findIndex(goal => goal.id.toString() === b);

        if (i === j || i === -1 || j === -1) return;

        var [goalI, goalJ] = [track.goals[i], track.goals[j]];
        const [refA, refB] = [goalI.ref, goalJ.ref];

        swapTrackReferences(track.track, refA, refB);

        track.goals[i].ref = refB;
        track.goals[j].ref = refA;

        track.goals[i] = goalJ;
        track.goals[j] = goalI;
    }

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