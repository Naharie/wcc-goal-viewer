import React from "react";

interface BadgeButtonProps
{
    value: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BadgeButton = ({ value, className, onClick } : BadgeButtonProps) =>
{
    return (
        <div className={`
            inline-flex justify-center items-center
            w-10 h-10 rounded-full text-3xl
            bg-red-400 hover:bg-red-600
            ${className ?? ""}
            `} onClick={onClick}>
            {value}
        </div>
    )
};

export default BadgeButton;