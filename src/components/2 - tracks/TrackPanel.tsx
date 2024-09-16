import SimpleBar from "simplebar-react";
import { useEditor } from "../../data/editor";
import Track from "./Track";
import { useData } from "../../data";

const TrackPanel = () =>
{
    const tracks = useData(data => data.tracks);    
    const dimmed = useEditor(editor => editor.id !== undefined);

    return (
        <SimpleBar className={"h-full pt-6" + (dimmed ? " bg-dim-not-selected" : "")}>
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;