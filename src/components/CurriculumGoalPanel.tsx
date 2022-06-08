import React from "react";
import styled from "styled-components";
import { selectCurriculumGoals } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";

import CurriculumGoal from "./CurriculumGoal";

const PanelBase = styled.ol`
    padding-right: 1em;
`;

const CurriculumGoalPanel = () =>
{
    const goals = useAppSelector(selectCurriculumGoals);

    return (
        <SimpleBar style={{ maxHeight: "100%" }}>
            <PanelBase type="I">
                {
                    goals.map((goal, index) =>
                        <CurriculumGoal key={goal.id} index={index} />
                    )
                }
            </PanelBase>
        </SimpleBar>
    );
};

export default CurriculumGoalPanel;