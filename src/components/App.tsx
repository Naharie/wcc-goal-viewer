import Center from "./styled/Center";
import Spinner from "./styled/Spinner";
import { selectStatus, LoadingStatus } from "../data";
import { useAppSelector } from "../hooks/redux";
import useData from "../hooks/useData";
import CurriculumGoalPanel from "./CurriculumGoalPanel";
import TrackGoalPanel from "./TrackGoalPanel";
import FlexChild from "./styled/FlexChild";
import FlexContainer from "./styled/FlexContainer";

export default () =>
{
    const status = useAppSelector(selectStatus);

    useData();

    if (status === LoadingStatus.Loading)
    {
        return (
            <Center>
                <Spinner />
            </Center>
        );
    }

    return(
        <FlexContainer>
            <FlexChild>
                <CurriculumGoalPanel />
            </FlexChild>
            <FlexChild>
                <TrackGoalPanel />
            </FlexChild>
            <FlexChild size={2}>
                { /* <CoursePanel courses={derive(data, "courses")} highlight={courses} env={editEnv} /> */ }
            </FlexChild>
        </FlexContainer>
    );
};