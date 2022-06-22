import { useRef } from "react";
import { selectTracks } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";
import Track from "./Track";

const TrackPanel = () =>
{
    const tracks = useAppSelector(selectTracks);

    return (
        <SimpleBar className="h-full mt-6">
            {tracks.map((_, index) =>
                <Track key={index} track={index} />
            )}
        </SimpleBar>
    );
};

export default TrackPanel;