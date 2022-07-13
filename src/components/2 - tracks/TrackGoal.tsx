import useData from "../../data";
import useEditor from "../../data/editor";
import useHighlight from "../../data/highlight";
import useScores, { average } from "../../data/scores";
import TextBox from "../editor/TextBox";
import GoalBase from "../GoalBase";
import toggleTrackGoalHighlight from "../../data/actions/highlight/toggle/trackGoalHighlight";

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
    const dimmed = useEditor(editor => editor.id !== undefined && editor.id !== goal.id);
    const editable = useEditor(editor => editor.id === goal.id);

    const highlighted = useHighlight(highlight => highlight.tracks[track.name][goal.ref]);

    const references =
        goal.references.map(
            ref =>
                ref.subGoals.length > 0 ?
                    ref.goal + " " + ref.subGoals.join(", ") :
                    ref.goal
        ).join("; ");

    return (
        <GoalBase
            goal={goal} highlighted={highlighted}
            score={score}
            className="mb-4 p-1" onClick={toggleTrackGoalHighlight(track.name, goal.ref)}
            slotAfterText={
                editable ?
                    <>
                        <TextBox value={references} className="px-2 border border-solid border-gray-300 border-b-transparent rounded-t-md w-full" />
                        <div className="bg-red-300 px-2 border border-solid border-gray-300 border-t-transparent rounded-b-md w-[99.3%] box-border">
                            Format references as follows:<br/>
                            II a, b; III b<br />
                            That is: goal sub-goal, ...; goal sub-goal, ...; ...
                        </div>
                    </>
                : goal.references.length > 0 ? ` (${references}).` : ""
            }
        >
            {
                editable ?
                    <div className="flex flex-row w-full mt-2">
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-l-md">Done</button>
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-r-md">Cancel</button>
                    </div>
                    : null
            }
        </GoalBase>
    );
};

export default TrackGoal;