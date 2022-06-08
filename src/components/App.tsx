import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import CenteredContainer from "./CenteredContainer";
import Spinner from "./Spinner";
import { selectStatus, LoadingStatus } from "../data";
import { useAppSelector } from "../hooks/redux";
import useData from "../hooks/useData";
import CurriculumGoalPanel from "./CurriculumGoalPanel";

const FlexContainer = styled.div`
    display: flex;
    min-height: 0;
    height: 100%;
`;
const FlexChild = styled.div(({ size = 1}: PropsWithChildren<{ size?: number }>) =>
    `
        flex: ${size} ${size} 0;
        height: 100%;
        border-right: 1px solid gray;
    `
);

export default () =>
{
    const status = useAppSelector(selectStatus);

    useData();

    if (status === LoadingStatus.Loading)
    {
        return (
            <CenteredContainer>
                <Spinner />
            </CenteredContainer>
        );
    }

    return(
        <FlexContainer>
            <FlexChild>
                <CurriculumGoalPanel />
            </FlexChild>
            <FlexChild>
                { /* <TrackPanel tracks={derive(data, "tracks")} highlight={tracks} env={editEnv} /> */ }
            </FlexChild>
            <FlexChild size={2}>
                { /* <CoursePanel courses={derive(data, "courses")} highlight={courses} env={editEnv} /> */ }
            </FlexChild>
        </FlexContainer>
    );
};