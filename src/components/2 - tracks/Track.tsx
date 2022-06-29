import { useSnapshot } from "valtio";
import store from "../../data";
import TrackGoal from "./TrackGoal";

const Track = ({ track: index }: { track: number }) =>
{
    const view = useSnapshot(store);
    const track = view.data.tracks[index];

    const goals =
        track.goals.map((goal, goalIndex) =>
            <TrackGoal key={goal.id} track={index} goal={goalIndex} />
        );

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.track}</a>
            <ol className="list-decimal">
                {goals}
            </ol>
        </div>
    );
};

export default Track;