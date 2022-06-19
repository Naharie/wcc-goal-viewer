import React, { FC, ForwardedRef, MutableRefObject, PropsWithChildren } from "react";
import styled from "styled-components";
import { selectTrack, selectTrackGoal } from "../data";
import { useAppSelector } from "../hooks/redux";
import GoalElement from "./GoalElement";

const CenteredText = styled.a`
    display: block;
    text-align: center;
    text-decoration: none;
    color: black;
`;

const PanelBase = styled.ol`
    padding-right: 1em;
`;

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
            <CenteredText>{track.track}</CenteredText>
            <PanelBase type="1">
                {
                    track.goals.map((goal, subIndex) =>
                        <GoalElement key={goal.id + offset} selector={selectTrackGoal(index, subIndex)} />
                    )
                }
            </PanelBase>
        </div>
    );
});

export default TrackPanel;