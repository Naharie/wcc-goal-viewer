import React, { FC, useState } from "react";
import { list } from "../utilities/css";
import { average } from "../utilities/math";
import useCanEdit from "../hooks/useCanEdit";

interface ScoreListProps
{
    scores?: number[];
    averageScores?: boolean;
    setScores?: (value: number[]) => void;
    isEditing?: boolean;
}

const roundNumber = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const ScoreList: FC<ScoreListProps> = ({ scores, averageScores, setScores, isEditing }) =>
{
    const [dropdown, setDropdown] = useState(false);
    const canEdit = useCanEdit();

    if ((scores === undefined || scores.length === 0) && !isEditing)
    {
        return (null);
    }

    const addScore = (value: number) =>
    {
        setScores?.([...(scores ?? []), value]);
        setDropdown(false);
    };
    const removeScore = (entryIndex: number) =>
    {
        setScores?.(scores?.filter((_, index) => index !== entryIndex) ?? []);
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

    const computed =
        averageScores && scores !== undefined && scores.length > 0 ?
            [ average(scores) ] :
            scores;

    return (
        <div className="mt-0-5">
            {
                computed?.map((score, index) =>
                {
                    const rounded = roundNumber(score);
                    const badgeColor = rounded < 3 ? "error" : "badge-normal";

                    if (canEdit)
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