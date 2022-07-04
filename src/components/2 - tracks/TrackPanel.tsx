import SimpleBar from "simplebar-react";
import { useSnapshot } from "valtio";
import store from "../../data";
import Track from "./Track";

const TrackPanel = () =>
{
    const view = useSnapshot(store);
    const tracks = view.data.tracks;

    const dimmed = view.editorId !== undefined;

    return (
        <SimpleBar className={"h-full pt-6" + (dimmed ? " bg-dim-not-selected" : "")}>
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;