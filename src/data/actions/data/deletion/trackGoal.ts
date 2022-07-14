import useData from "../../..";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const deleteTrackGoal = (trackIndex: number, index: number) =>
{
    useData.getState().update(data =>
    {
        const track = data.tracks[trackIndex];
        const goal = track.goals[index];

        track.goals.splice(index, 1);

        useScores.getState().update(scores =>
        {
            delete scores.tracks[track.name][goal.ref];
        })
        useHighlight.getState().update(highlight =>
        {
            delete highlight.tracks[track.name][goal.ref];
        });
    });
};

export default deleteTrackGoal;