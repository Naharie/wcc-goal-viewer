import Spinner from "./Spinner";
import CurriculumPanel from "./1 - curriculum/CurriculumPanel";
import TrackPanel from "./2 - tracks/TrackPanel";
import CoursePanel from "./3 - courses/CoursePanel";
import useFetchData from "../hooks/useFetchData";
import useLoadingStatus from "../data/loadingStatus";
import useEditor from "../data/editor";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default () =>
{
    const isLoaded = useLoadingStatus(status => status.isLoaded);
    const errorMessage = useLoadingStatus(status => status.errorMessage);
    const editorOpen = useEditor(editor => editor.id !== undefined);

    const confirmDeletion = useEditor(editor => editor.confirmDeletion);

    useFetchData();

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
        const reload = () => location.reload();

        return (
            <div className="flex flex-col justify-center items-center w-full h-full text-2xl">
                <div className="inline-block text-center bg-red-300 rounded-md p-4">
                    {errorMessage}<br />
                    Please reload to try again. If this error occurs again, please report it.
                </div>
                <button className="mt-8 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-md" onClick={reload}>Reload</button>
            </div>
        );
    }
    
    return(
        <>
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
                {/*editorOpen ? <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-[100]"></div> : null*/}
            </div>
            <Modal
                isOpen={confirmDeletion !== undefined}
                contentLabel="Label"
                className={`
                    bg-white
                    absolute
                    top-[50%] left-[50%]
                    translate-x-[-50%] translate-y-[-50%]
                    w-96 p-4
                    rounded-md
                    z-[200]
                `}
                overlayClassName="absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-75"
            >
                Are you sure you want to delete this goal?<br />
                THIS CAN NOT BE UNDONE!

                <div className="flex w-full pt-4">
                    <button className="flex-1 bg-red-400 hover:bg-red-500 rounded-l-md" onClick={confirmDeletion?.yes}>Yes</button>
                    <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-r-md" onClick={confirmDeletion?.no}>No</button>
                </div>
            </Modal>
        </>
    );
};