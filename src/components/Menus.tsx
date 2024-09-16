import { MutableRefObject, useState } from "react";
import { useEditor } from "../data/editor";
import Modal from "react-modal";
import { setError } from "../data/loadingStatus";
import { dataValidator } from "../data/validation";
import upload from "../utilities/upload-file";
import download from "../utilities/download-file";
import { useData } from "../data";

const invalidDataFile = "Invalid data file. Please have the file checked.";

export const Menus = (props: { keyUpHandler: MutableRefObject<(event: React.KeyboardEvent<HTMLDivElement>) => void> }) =>
{
    const editorEnabled = useEditor(editor => editor.enabled);

    const [showMenu, setShowMenu] = useState(false);
    const closeMenu = () => setShowMenu(false);

    const confirmDeletion = useEditor(editor => editor.confirmDeletion);

    const importData = async () =>
    {
        setShowMenu(false);

        try
        {
            const rawData = await upload("*.json");
            const result = dataValidator.safeParse(JSON.parse(rawData));
    
            if (!result.success)
            {
                setError(invalidDataFile)
                return;
            }

            useData.getState().set(result.data);
        }
        catch (_)
        {
            setError(invalidDataFile);
        }
    };
    const exportData = () =>
    {
        setShowMenu(false);

        const data = JSON.stringify (useData.getState(), undefined, 4);
        download("data.json", data);
    };

    const keyUpHandler = props.keyUpHandler;

    keyUpHandler.current = event =>
    {
        if (!editorEnabled || event.key !== "Escape") return;
        setShowMenu(true);
    };

    return (
        <>
            <Modal
                isOpen={confirmDeletion !== undefined}
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

            <Modal
                isOpen={showMenu}
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
                <div className="flex w-full">
                    <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-l-md" onClick={importData}>Import</button>
                    <button className="flex-1 bg-gray-400 hover:bg-gray-500" onClick={exportData}>Export</button>
                    <button className="flex-1 bg-gray-400 hover:bg-gray-500 rounded-r-md" onClick={closeMenu}>Cancel</button>
                </div>
            </Modal>

        </>
    );
};