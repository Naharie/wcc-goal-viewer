import SimpleBar from "simplebar-react";
import useData from "../../data";
import useEditor from "../../data/editor";
import Track from "./Track";

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