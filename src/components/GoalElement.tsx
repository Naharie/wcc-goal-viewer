import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { State } from "../data";
import { useAppSelector } from "../hooks/redux";
import { Goal } from "../types/data";

interface GoalElementProps
{
    isSubGoal?: boolean;
    selector: (state: State) => Goal;
}

const GoalElementBase = styled.li`
    margin-bottom: 1.3em;
`;

const SubGoalElementBase = styled.li`
    padding-bottom: 0.2em;;
`;

const GoalElement = ({ selector, isSubGoal, children }: PropsWithChildren<GoalElementProps>) =>
{
    const goal = useAppSelector(selector);
    const ElementBase = isSubGoal ? SubGoalElementBase : GoalElementBase;

    return (
        <ElementBase>
            {goal.text}
            {children}
        </ElementBase>
    );
};

export default GoalElement;