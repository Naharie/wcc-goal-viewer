import { useSnapshot } from "valtio";
import store from "../../data";
import { clearCurriculumHighlight, computeTrackToCourseHighlighting } from "../../data/highlight";
import { average } from "../../data/scores";
import ScoreBadge from "../scores/Badge";

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

    const toggleHighlight = () =>
    {
        store.highlight.tracks[track.track][goal.ref] = !highlighted;
        clearCurriculumHighlight();
        computeTrackToCourseHighlighting();
    };

    return (
        <li className={"list-item mb-4 p-1 rounded-md" + (highlighted ? " bg-selected" : "")} onClick={toggleHighlight}>
            {goal.text}
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
            {score > -1 ? <ScoreBadge value={score} /> : null}
        </li>
    );
};

export default TrackGoal;