import { useState } from "react";
import BadgeButton from "./BadgeButton";
import ScoreBadge from "./ScoreBadge";

interface ScoreSelectorProps
{
    value: number;
    className?: string;
    onSelectScore?: (score: number) => void;
    onDelete?: () => void;
}

const ScoreSelector = (props: ScoreSelectorProps) =>
{
    const [value, setValue] = [props.value, props.onSelectScore ?? (() => {})];
    const [open, setOpen] = useState(false);

    const openSelector = () => setOpen(true);
    const chooseValue = (value: number) => () =>
    {
        setValue(value);
        setOpen(false);
    };
    const deleteSelector = () =>
    {
        setOpen(false);
        props?.onDelete?.();
    };

    const styles = `
        inline-block
        bg-gray-300
        ${open ? "w-60" : "w-10"} h-10
        rounded-full text-3xl
        ${props.className ?? ""}
    `;

    return (
        <div className={styles}>
            {!open ?
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