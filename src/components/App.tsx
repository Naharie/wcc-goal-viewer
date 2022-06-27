import Spinner from "./Spinner";
import CurriculumPanel from "./1 - curriculum/CurriculumPanel";
import TrackPanel from "./2 - tracks/TrackPanel";
import CoursePanel from "./3 - courses/CoursePanel";
import useData from "../hooks/useData";
import { useSnapshot } from "valtio";
import store from "../data";

export default () =>
{
    const view = useSnapshot(store);

    useData();
    
    if (view.errorMessage !== null)
    {
        const reload = () => location.reload();

        return (
            <div className="flex flex-col justify-center items-center w-full h-full text-2xl">
                <div className="inline-block text-center bg-red-300 rounded-md p-4">
                    {view.errorMessage}<br />
                    Please reload to try again. If this error occurs again, please report it.
                </div>
                <button className="mt-8 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md" onClick={reload}>Reload</button>
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