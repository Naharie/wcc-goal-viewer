import useTrackGoal from "../../data/views/2 - tracks/useTrackGoal";
import TextBox from "../editor/TextBox";
import GoalBase from "../GoalBase";

interface TrackGoalProps
{
    trackIndex: number;
    index: number;
}

const TrackGoal = ({ trackIndex, index }: TrackGoalProps) =>
{
    const { goal, highlighted, score, editable, toggleHighlight } = useTrackGoal(trackIndex, index);

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
            className="mb-4 p-1" onClick={toggleHighlight}
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