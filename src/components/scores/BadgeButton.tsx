import React from "react";

interface BadgeButtonProps
{
    value: string;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const BadgeButton = ({ value, onClick } : BadgeButtonProps) =>
{
    return (
        <div className="
            inline-flex justify-center items-center
            w-12 h-12 rounded-full text-3xl
            bg-red-400 hover:bg-red-600
        " onClick={onClick}>
            {value}
        </div>
    )
};

export default BadgeButton;