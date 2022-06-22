import { selectTrack } from "../data";
import { useAppSelector } from "../hooks/redux";

const Track = ({ track: index }: { track: number }) =>
{
    const track = useAppSelector(selectTrack(index));

    return (
        <div className="mx-8">
            <a className="block text-center no-underline text-black mb-4">{track.track}</a>
            <ol className="list-decimal">
                {
                    track.goals.map((goal, _) =>
                        <li className="list-item mb-4">{goal.text}</li>
                    )
                }
            </ol>
        </div>
    );
};

export default Track;