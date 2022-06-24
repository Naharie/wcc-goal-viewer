import Spinner from "./Spinner";
import CurriculumPanel from "./1 - curriculum/CurriculumPanel";
import TrackPanel from "./2 - tracks/TrackPanel";
import CoursePanel from "./3 - courses/CoursePanel";
import useStore, { LoadingStatus } from "../data";
import useData from "../hooks/useData";

export default () =>
{
    const status = useStore(state => state.loadingStatus);

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