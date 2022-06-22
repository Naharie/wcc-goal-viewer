import Spinner from "./Spinner";
import { selectStatus, LoadingStatus } from "../data";
import { useAppSelector } from "../hooks/redux";
import useData from "../hooks/useData";
import CurriculumPanel from "./CurriculumPanel";
import TrackPanel from "./TrackPanel";
import CoursePanel from "./CoursePanel";

export default () =>
{
    const status = useAppSelector(selectStatus);

    useData();

    if (status === LoadingStatus.Loading)
    {
        return (
            <div className="flex justify-center items-center min-h-0 h-full">
                <Spinner />
            </div>
        );
    }

    return(
        <div className="flex min-h-0 h-full">
            <div className="flex-1 h-full border-solid border-r border-r-gray-500">
                <CurriculumPanel />
            </div>
            <div className="flex-1 h-full border-solid border-r border-r-gray-500">
                <TrackPanel />
            </div>
            <div className="flex-[2_2_0] h-full border-solid border-r border-r-gray-500">
                <CoursePanel />
            </div>
        </div>
    );
};