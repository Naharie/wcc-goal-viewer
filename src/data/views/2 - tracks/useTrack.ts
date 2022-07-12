import { useSnapshot } from "valtio";
import store from "../..";
import swapGoals from "../../../utilities/swap-goals";
import { swapTrackReferences } from "../../highlight";

const useTrack = (index: number) =>
{
    const view = useSnapshot(store);
    
    return ({
        track: view.data.tracks[index],

        dimmed: view.editorId !== undefined,
        allowSorting: view.editorEnabled && view.editorId === undefined,

        swapChildren(a: string, b: string)
        {
            const track = store.data.tracks[index];
            const [success, refA, refB] = swapGoals(track.goals, a, b);
        
            if (success)
            {
                swapTrackReferences(track.name, refA, refB);
            }

            const [highlightA, highlightB] = [ store.highlight.tracks[track.name][refA], store.highlight.tracks[track.name][refB] ];
            [ store.highlight.tracks[track.name][refA], store.highlight.tracks[track.name][refB] ] = [highlightB, highlightA];
        }
    })
};

export default useTrack;