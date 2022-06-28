import React from "react";

interface ScoreBadgeProps
{
    value: number;
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ScoreBadge = ({ value, onClick } : ScoreBadgeProps) =>
{
    return (
        <div className={`
            inline-flex justify-center items-center
            w-12 h-12 rounded-full text-3xl

            ${
                value <= 2 ?
                    "bg-red-400" :
                    "bg-blue-400"
            }
            ${
                onclick !== undefined ?
                    value <= 2 ?
                        "hover:bg-red-600" :
                        "hover:bg-blue-500"
                    : ""
            }
        `} onClick={onClick}>
            {value}
        </div>
    )
};

export default ScoreBadge;