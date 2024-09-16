import Spinner from "./Spinner";
import CurriculumPanel from "./1 - curriculum/CurriculumPanel";
import TrackPanel from "./2 - tracks/TrackPanel";
import CoursePanel from "./3 - courses/CoursePanel";
import Modal from "react-modal";
import React, { useRef } from "react";
import { Menus } from "./Menus";
import { useLoadingStatus } from "../data/loadingStatus";

Modal.setAppElement("#root");

export default () =>
{
    const isLoaded = useLoadingStatus(status => status.isLoaded);
    const errorMessage = useLoadingStatus(status => status.errorMessage);
    const keyUpHandler = useRef<(event: React.KeyboardEvent<HTMLDivElement>) => void>  (() => {});

    if (!isLoaded)
    {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full text-2xl">
                <Spinner />
            </div>
        )
    }   
    if (errorMessage !== undefined)
    {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full text-2xl">
                <div className="inline-block text-center bg-red-300 rounded-md p-4">
                    {errorMessage}<br />
                    Please reload to try again. If this error occurs again, please report it.
                </div>
                <button className="mt-8 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md" onClick={location.reload}>Reload</button>
            </div>
        );
    }

    return(
        <>
            <div className="flex min-h-0 h-full" onKeyUp={e => keyUpHandler.current(e)}>
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

            <Menus keyUpHandler={keyUpHandler} />
        </>
    );
};