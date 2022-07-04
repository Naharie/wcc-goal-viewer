import { useSnapshot } from "valtio";
import store from "../../data";
import { clearCurriculumHighlight, computeTrackToCourseHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import chooseBackground from "../../utilities/choose-background";
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

    const toggleHighlight = () =>
    {
        if (dimmed) return;
        store.highlight.tracks[track.track][goal.ref] = !highlighted;
        clearCurriculumHighlight();
        computeTrackToCourseHighlighting();
    };

    return (
        <li className={"relative list-item mb-4 p-1 rounded-md " + chooseBackground(highlighted, dimmed)} onClick={toggleHighlight}>
            {
                goal.references.length > 0 ?
                    ` (${
                        goal.references.map(
                            ref =>
                                ref.subGoals.length > 0 ?
                                    ref.goal + " " + ref.subGoals.join(", ") :
                                    ref.goal
                        )
                        .join("; ")
                    })` : ""
            }
            .
            <div>
                {score > -1 ? <ScoreBadge className="mr-3" value={score} /> : null}
            </div>
        </li>
    );
};

export default TrackGoal;