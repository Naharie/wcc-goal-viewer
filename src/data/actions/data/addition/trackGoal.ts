import useData from "../../..";
import nextGoalId from "../../../../utilities/goal-id";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const addTrackGoal = (index: number) =>
{
    useData.getState().update(data =>
    {
        const track = data.tracks[index];

        const id = nextGoalId();
        const ref = (track.goals.length + 1).toString();

        track.goals.push({
            text: "== PLACEHOLDER ==",
            id, ref,
            references: []
        });

        useScores.getState().update(scores =>
        {
            scores.tracks[track.name][ref] = [];
        });
        useHighlight.getState().update(highlight =>
        {
            highlight.tracks[track.name][ref] = false;
        });
    });
};

export default addTrackGoal;