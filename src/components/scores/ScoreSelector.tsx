import { useState } from "react";
import BadgeButton from "./BadgeButton";
import ScoreBadge from "./Badge";

interface ScoreSelectorProps
{
    onSetScore?: (score: number) => void;
    onDelete?: () => void;
}

const ScoreSelector = (props: ScoreSelectorProps) =>
{
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const openSelector = () => setOpen(true);;
    const chooseValue = (value: number) => () =>
    {
        setValue(value);
        setOpen(false);
        props?.onSetScore?.(value);
    };
    const deleteSelector = () =>
    {
        setOpen(false);
        props?.onDelete?.();
    };

    return (
        <div className={`inline-block bg-gray-300 ${open ? "w-72" : "w-12"} h-12 rounded-full text-3xl`}>
            {
                !open ?
                    <ScoreBadge value={value} onClick={openSelector} /> :
                    
                    <>
                        {[ 0, 1, 2, 3, 4 ].map(value =>
                            <ScoreBadge key={value} value={value} onClick={chooseValue(value)} />
                        )}
                        <BadgeButton value="×" onClick={deleteSelector} />
                    </>
            }
        </div>
    )
};

export default ScoreSelector;