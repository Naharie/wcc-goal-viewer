import Spinner from "./Spinner";
import CurriculumPanel from "./1 - curriculum/CurriculumPanel";
import TrackPanel from "./2 - tracks/TrackPanel";
import CoursePanel from "./3 - courses/CoursePanel";
import useData from "../hooks/useData";
import { useAtom } from "jotai";
import { isLoadedAtom } from "../data";

export default () =>
{
    const [isLoaded] = useAtom(isLoadedAtom);

    useData();

    if (!isLoaded)
    {
        return (
            <div className="flex justify-center items-center min-h-0 h-full">
                <Spinner />
            </div>
        );
    }
    
    // TODO: Show a overlay when an error message is set.

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