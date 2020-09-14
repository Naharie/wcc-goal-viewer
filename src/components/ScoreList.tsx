import React, { FC, useState } from "react";
import { list } from "../utilities";

interface ScoreListProps
{
    scores?: number[];
    setScores?: (value: number[]) => void;
    isEditing?: boolean;
}

const roundNumber = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const ScoreList: FC<ScoreListProps> = ({ scores, setScores, isEditing }) =>
{
    const [dropdown, setDropdown] = useState(false);

    if ((scores === undefined || scores.length === 0) && !isEditing)
    {
        return (null);
    }

    const addScore = (value: number) =>
    {
        if (setScores)
        {
            setScores([...(scores ?? []), value]);
        }

        setDropdown(false);
    };
    const removeScore = (entryIndex: number) =>
    {
        if (isEditing && setScores !== undefined)
        {
            setScores(scores?.filter((_, index) => index !== entryIndex) ?? []);
        }
    };

    const editMenu = () =>
    {
        return (
            <div className="dropdown inline-block">
                <span className="badge badge-normal badge-button cursor-pointer" onClick={() => setDropdown(!dropdown)}>
                    {dropdown ? "×" : "+"}
                </span>
                <div className={list(
                    "dropdown-content",
                    (scores?.length ?? 0) > 0 ? "dropdown-center" : null,
                    dropdown ? "dropdown-show" : null
                )}>
                    {
                        [0, 1, 2, 3, 4].map(value =>
                            <span
                                key={value}
                                className="badge badge-normal badge-button cursor-pointer"
                                onClick={() => addScore(value)}
                            >{value}</span>
                        )
                    }
                </div>
            </div>
        );
    };

    return (
        <div className="mt-0-5">
            {
                scores?.map((score, index) =>
                {
                    const rounded = roundNumber(score);
                    const badgeColor = rounded < 3 ? "error" : "badge-normal";

                    if (isEditing)
                    {
                        const classBase = "badge badge-button cursor-pointer";

                        return (
                            <span key={index} className={list(classBase, badgeColor)} onClick={() => removeScore(index)}>
                                {rounded}
                            </span>
                        );
                    }

                    return (
                        <span key={index} className={list("badge", badgeColor)}>{rounded}</span>
                    );
                })
            }
            {isEditing ? editMenu() : null}
        </div>
    );
};

export default ScoreList;