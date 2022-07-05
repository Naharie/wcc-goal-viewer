import React from "react";
import useClick from "../../hooks/useClick";

interface BadgeButtonProps
{
    value: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const BadgeButton = ({ value, className, onClick } : BadgeButtonProps) =>
{
    const [mouseDown, mouseUp] = useClick(onClick ?? (() => {}));

    return (
        <div className={`
            inline-flex justify-center items-center
            w-10 h-10 rounded-full text-3xl
            bg-red-400 hover:bg-red-600
            ${className ?? ""}
        `}
            onMouseDown={mouseDown} onMouseUp={mouseUp}
        >
            {value}
        </div>
    )
};

export default BadgeButton;