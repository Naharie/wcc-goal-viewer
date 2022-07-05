import { useSnapshot } from "valtio";
import store from "../../data";
import { computeCurriculumToTrackHighlighting, computeTrackToCourseHighlighting, swapTrackReferences } from "../../data/highlight";
import swapGoals from "../../utilities/swap-goals";
import SortableList from "../sortable/SortableList";
import TrackGoal from "./TrackGoal";

const Track = ({ track: index }: { track: number }) =>
{
    const view = useSnapshot(store);
    const track = view.data.tracks[index];

    const goals =
        track.goals.map((goal, goalIndex) =>
        ({
            id: goal.id.toString(),
            value: <TrackGoal key={goal.id} track={index} goal={goalIndex} />
        }));

    const handleSwap = (a: string, b: string) =>
    {
        const track = store.data.tracks[index];
        const [success, refA, refB] = swapGoals(track.goals, a, b);
    
        if (success)
        {
            swapTrackReferences(track.track, refA, refB);
        }

        if (store.lastHighlightedColumn === "curriculum")
        {
            computeCurriculumToTrackHighlighting();
        }
        else
        {
            const [highlightA, highlightB] = [ store.highlight.tracks[track.track][refA], store.highlight.tracks[track.track][refB] ];
            [ store.highlight.tracks[track.track][refA], store.highlight.tracks[track.track][refB] ] = [highlightB, highlightA];
            computeTrackToCourseHighlighting();
        }
    }

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.track}</a>
            <SortableList
                className="list-decimal"
                dragId={"track-" + track.track}
                lockXAxis
                allowSorting={view.editorEnabled && view.editorId === undefined}
                items={goals}
                onSwap={handleSwap}
            />
        </div>
    );
};

export default Track;