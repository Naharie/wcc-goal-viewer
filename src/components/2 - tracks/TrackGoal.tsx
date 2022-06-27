import { useSnapshot } from "valtio";
import store from "../../data";

interface TrackGoalProps
{
    track: number;
    goal: number;
}

const TrackGoal = ({ track, goal: index }: TrackGoalProps) =>
{
    const view = useSnapshot(store);
    const goal = view.data.tracks[track].goals[index];

    return (
        <li className="list-item mb-4 p-1 rounded-md">
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
        </li>
    );
};

export default TrackGoal;