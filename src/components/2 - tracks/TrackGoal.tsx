import useData from "../../data";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import GoalBase from "../GoalBase";
import toggleTrackGoalHighlight from "../../data/actions/highlight/toggle/trackGoalHighlight";
import validator from "../../validators/trackGoalReferencesValidator";
import deleteTrackGoal from "../../data/actions/data/deletion/trackGoal";
import useEditor from "../../data/editor";
import { TrackGoalReference } from "../../data/validation";

interface TrackGoalProps
{
    trackIndex: number;
    index: number;
}

const TrackGoal = ({ trackIndex, index }: TrackGoalProps) =>
{
    const track = useData(data => data.tracks[trackIndex]);
    const update = useData(data => data.update);
    const closeEditor = useEditor(editor => editor.closeEditor);

    const goal = track.goals[index];

    const score = useScores(scores => average(scores.tracks[track.name][goal.ref]));
    const highlighted = useHighlight(highlight => highlight.tracks[track.name][goal.ref]);

    const references =
        goal.references.map(
            reference =>
                reference.subGoals?.length ?? 0 > 0 ?
                    reference.goal + " " + reference.subGoals?.join(", ") ?? "" :
                    reference.goal
        ).join("; ");

    const saveGoal = (text: string) =>
    {
        update(data =>
        {
            data.tracks[trackIndex].goals[index].text = text;
        });
        closeEditor();
    };
    const deleteGoal = () =>
    {
        deleteTrackGoal(trackIndex, index);
        closeEditor();
    };

    const saveReferences = (value: string) =>
    {
        const references: TrackGoalReference[] = value.split("; ").filter(part => part.trim() !== "").map(part =>
        {
            if (!part.includes(" "))
            {
                return ({ goal: part, subGoals: [] });
            }

            const [goal, ...subGoalParts] = part.split(" ");
            const subGoals = subGoalParts.join(" ").split(",").map(part => part.trim());

            return ({ goal, subGoals });
        });

        update(data =>
        {
            data.tracks[trackIndex].goals[index].references = references;
        });
    };

    return (
        <GoalBase
            goal={goal} highlighted={highlighted}
            score={score}
            references={{ value: references, validator, saveReferences }}
            className="mb-4 p-1"
            
            saveGoal={saveGoal}
            deleteGoal={deleteGoal}

            onClick={toggleTrackGoalHighlight(track.name, goal.ref)}
        >
        </GoalBase>
    );
};

export default TrackGoal;