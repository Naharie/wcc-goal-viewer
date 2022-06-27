import { useAtom } from "jotai";
import SimpleBar from "simplebar-react";
import { tracksAtom } from "../../data";
import Track from "./Track";

const TrackPanel = () =>
{
    const [tracks] = useAtom(tracksAtom);

    return (
        <SimpleBar className="h-full mt-6">
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;