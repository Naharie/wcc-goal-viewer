import useData from "../../..";
import swapGoals from "../../../../utilities/swap-goals";
import useHighlight from "../../../highlight";
import swapTrackReferences from "../references/swapTrackGoals";

const swapTrackGoals = (trackIndex: number) => (idA: string, idB: string) =>
{
    const updateData = useData.getState().update;
    const updateHighlight = useHighlight.getState().update;

    updateData(data =>
    {
        const track = data.tracks[trackIndex];
        const [success, refA, refB] = swapGoals(track.goals, idA, idB);
            
        if (!success) return;
        swapTrackReferences(data, track.name, refA, refB);
    
        updateHighlight(highlight =>
        {
            const [highlightA, highlightB] = [ highlight.tracks[track.name][refA], highlight.tracks[track.name][refB] ];
            [ highlight.tracks[track.name][refA], highlight.tracks[track.name][refB] ] = [highlightB, highlightA];
        });
    });
};

export default swapTrackGoals;