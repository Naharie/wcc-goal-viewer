import React from "react";
import useClick from "../../hooks/useClick";

interface ScoreBadgeProps
{
    value: number;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const ScoreBadge = ({ value, className, onClick } : ScoreBadgeProps) =>
{
    const [mouseDown, mouseUp] = useClick(onClick ?? (() => {}))

    const [color, hoverColor] =
        value < 3 ?
            ["bg-red-400", "hover:bg-red-600"] :
            ["bg-blue-400", "hover:bg-blue-500"];

    return (
        <div className={`
            inline-flex justify-center items-center
            w-10 h-10 rounded-full text-3xl
            ${color}
            ${onclick && hoverColor}
            ${className ?? ""}
        `}
            onMouseDown={mouseDown} onMouseUp={mouseUp}
        >
            {value}
        </div>
    )
};

export default ScoreBadge;