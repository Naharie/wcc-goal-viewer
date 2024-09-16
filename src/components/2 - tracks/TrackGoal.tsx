import GoalBase from "../GoalBase";
import validator from "../../validators/trackGoalReferencesValidator";
import { useEditor } from "../../data/editor";
import { TrackGoalReference } from "../../data/validation";
import { useTrackGoalScores } from "../../data/scores";
import average from "../../utilities/average";
import { toggleTrackGoalHighlight, useTrackGoalHighlight } from "../../data/highlight";
import { deleteTrackGoal, updateTrackGoal, useData } from "../../data";

interface TrackGoalProps
{
    trackIndex: number;
    index: number;
}

const TrackGoal = ({ trackIndex, index }: TrackGoalProps) =>
{
    const track = useData(data => data.tracks[trackIndex]);
    const closeEditor = useEditor(editor => editor.closeEditor);

    const goal = track.goals[index];
    const score = average(useTrackGoalScores(track.name, goal.ref));
    const highlighted = useTrackGoalHighlight(track.name, goal.ref);

    const references =
        goal.references.map(
            reference =>
                reference.subGoals?.length ?? 0 > 0 ?
                    reference.goal + " " + reference.subGoals?.join(", ") ?? "" : reference.goal
        ).join("; ");

    

    const saveGoal = (text: string) =>
    {
        updateTrackGoal(trackIndex, index, text, goal.references);
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

        updateTrackGoal(trackIndex, index, goal.text, references);
    };

    return (
        <GoalBase
            goal={goal} highlighted={highlighted}
            score={score}
            references={{ value: references, validator, saveReferences }}
            className="mb-4 p-1"
            
            saveGoal={saveGoal}
            deleteGoal={deleteGoal}

            onClick={() => toggleTrackGoalHighlight(track.name, goal.ref)}
        >
        </GoalBase>
    );
};

export default TrackGoal;