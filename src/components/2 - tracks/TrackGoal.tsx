import { useSnapshot } from "valtio";
import store from "../../data";
import { clearCurriculumHighlight, computeTrackToCourseHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import TextBox from "../editor/TextBox";
import GoalBase from "../GoalBase";
import TrashCan from "../icons/trash-can";

interface TrackGoalProps
{
    track: number;
    goal: number;
}

const TrackGoal = ({ track: trackIndex, goal: index }: TrackGoalProps) =>
{
    const view = useSnapshot(store);

    const track = view.data.tracks[trackIndex];
    const goal = track.goals[index];

    const highlighted = view.highlight.tracks[track.track][goal.ref];
    const score = average(view.scores.tracks[track.track][goal.ref]);

    const editable = view.editorId === goal.id;

    const references =
        goal.references.map(
            ref =>
                ref.subGoals.length > 0 ?
                    ref.goal + " " + ref.subGoals.join(", ") :
                    ref.goal
        ).join("; ");

    const toggleHighlight = () =>
    {
        store.highlight.tracks[track.track][goal.ref] = !highlighted;
        store.lastHighlightedColumn = "tracks";

        clearCurriculumHighlight();
        computeTrackToCourseHighlighting();
    };

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
            {editable ?
                <TrashCan className="absolute right-1 box-content p-1 hover:bg-red-500 cursor-pointer rounded-md" /> : null
            }
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