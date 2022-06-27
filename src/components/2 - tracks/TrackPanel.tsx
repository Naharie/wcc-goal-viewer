import SimpleBar from "simplebar-react";
import { useSnapshot } from "valtio";
import store from "../../data";
import Track from "./Track";

const TrackPanel = () =>
{
    const view = useSnapshot(store);
    const tracks = view.data.tracks;

    return (
        <SimpleBar className="h-full pt-6">
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;