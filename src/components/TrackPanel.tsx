import React from "react";
import { selectTrack } from "../data";
import { useAppSelector } from "../hooks/redux";
import CenteredLink from "./styled/CenteredLink";
import GoalElement from "./styled/GoalElement";

interface TrackPanelProps
{
    track: number;
    offset?: string;
}

const TrackPanel = React.forwardRef<HTMLDivElement, TrackPanelProps>(({ track: index, offset = "" }, ref) =>
{
    const track = useAppSelector(selectTrack(index));

    return (
        <div ref={ref}>
            <CenteredLink>{track.track}</CenteredLink>
            <ol type="1">
                {
                    track.goals.map((goal, _) =>
                        <GoalElement>{goal.text}</GoalElement>
                    )
                }
            </ol>
        </div>
    );
});

export default TrackPanel;