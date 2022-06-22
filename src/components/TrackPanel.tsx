import SimpleBar from "simplebar-react";
import useStore from "../data";
import Track from "./Track";

const TrackPanel = () =>
{
    const tracks = useStore(state => state.data.tracks);

    return (
        <SimpleBar className="h-full mt-6">
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;