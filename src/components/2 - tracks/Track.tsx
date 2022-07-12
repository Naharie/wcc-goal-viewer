import useTrack from "../../data/views/2 - tracks/useTrack";
import SortableList from "../sortable/SortableList";
import TrackGoal from "./TrackGoal";

const Track = ({ track: index }: { track: number }) =>
{
    const { track, allowSorting, swapChildren } = useTrack(index);

    const goals =
        track.goals.map((goal, goalIndex) =>
        ({
            id: goal.id.toString(),
            value: <TrackGoal key={goal.id} trackIndex={index} index={goalIndex} />
        }));

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.name}</a>
            <SortableList
                className="list-decimal"
                dragId={"track-" + track.name}
                lockXAxis
                allowSorting={allowSorting}
                items={goals}
                onSwap={swapChildren}
            />
        </div>
    );
};

export default Track;