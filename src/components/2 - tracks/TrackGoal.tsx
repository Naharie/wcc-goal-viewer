import { useSnapshot } from "valtio";
import store from "../../data";
import { clearCurriculumHighlight, computeTrackToCourseHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
import GoalText from "../editor/GoalText";
import TextBox from "../editor/TextBox";
import TrashCan from "../icons/trash-can";
import ScoreBadge from "../scores/ScoreBadge";

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
    const dimmed = view.editorId != undefined && view.editorId != goal.id;

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
        if (editable || dimmed) return;

        store.highlight.tracks[track.track][goal.ref] = !highlighted;
        store.lastHighlightedColumn = "tracks";

        clearCurriculumHighlight();
        computeTrackToCourseHighlighting();
    };

    return (
        <li className={"relative list-item mb-4 p-1 rounded-md " + chooseBackground(highlighted, dimmed)} onClick={toggleHighlight}>
            {
                editable ?
                    <TrashCan className="absolute right-1 box-content p-1 hover:bg-red-500 cursor-pointer rounded-md" /> : null
            }

            <GoalText value={goal.text} isEditable={editable} />

            {
                editable ?
                    <>
                        <TextBox value={references} className="px-2 border border-solid border-gray-300 border-b-transparent rounded-t-md w-full" />
                        <div className="bg-red-300 px-2 border border-solid border-gray-300 border-t-transparent rounded-b-md w-[99.3%] box-border">
                            References are expected to be of the form:<br/>
                            II a, b; III b<br />
                            That is: goal sub-goal, ...; goal sub-goal, ...; ...
                        </div>
                    </>
                : goal.references.length > 0 ? ` (${references})` : ""
            }
            {!editable ? "." : ""}
            <div>
                {score > -1 ? <ScoreBadge className="mr-3" value={score} /> : null}
            </div>
            {
                editable ?
                    <div className="flex flex-row w-full mt-2">
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-l-md">Done</button>
                        <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-r-md">Cancel</button>
                    </div>
                    : null
            }
        </li>
    );
};

export default TrackGoal;