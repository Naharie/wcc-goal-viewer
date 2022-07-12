import { useSnapshot } from "valtio";
import store from "../..";
import { clearCurriculumHighlight, computeTrackToCourseHighlighting } from "../../highlight";
import { average } from "../../scores";

const useTrackGoal = (trackIndex: number, index: number) =>
{
    const view = useSnapshot(store);

    const track = view.data.tracks[trackIndex];
    const goal = track.goals[index];

    return ({
        goal,
        score: average(view.scores.tracks[track.name][goal.ref]),

        dimmed: view.editorId != undefined && view.editorId != goal.id,
        editable: view.editorId === goal.id,
        allowSorting: view.editorEnabled && view.editorId === undefined,

        highlighted: view.highlight.tracks[track.name][goal.ref],
        
        toggleHighlight()
        {
            store.highlight.tracks[track.name][goal.ref] = !this.highlighted;
            store.lastHighlightedColumn = "tracks";

            clearCurriculumHighlight();
            computeTrackToCourseHighlighting();
        }
    });
};

export default useTrackGoal;