import useData from "../../data";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import GoalBase from "../GoalBase";
import toggleTrackGoalHighlight from "../../data/actions/highlight/toggle/trackGoalHighlight";
import validator from "../../validators/trackGoalReferencesValidator";

interface TrackGoalProps
{
    trackIndex: number;
    index: number;
}

const TrackGoal = ({ trackIndex, index }: TrackGoalProps) =>
{
    const track = useData(data => data.tracks[trackIndex]);
    const goal = track.goals[index];

    const score = useScores(scores => average(scores.tracks[track.name][goal.ref]));
    const highlighted = useHighlight(highlight => highlight.tracks[track.name][goal.ref]);

    const references =
        goal.references.map(
            reference =>
                reference.subGoals.length > 0 ?
                    reference.goal + " " + reference.subGoals.join(", ") :
                    reference.goal
        ).join("; ");

    return (
        <GoalBase
            goal={goal} highlighted={highlighted}
            score={score}
            references={{
                value: references,
                validator,
                saveReferences: () => {}
            }}
            className="mb-4 p-1" onClick={toggleTrackGoalHighlight(track.name, goal.ref)}
        >
        </GoalBase>
    );
};

export default TrackGoal;