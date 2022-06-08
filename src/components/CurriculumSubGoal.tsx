import React, { PropsWithChildren } from "react";
import { selectCurriculumSubGoal } from "../data";
import GoalElement from "./GoalElement";

const CurriculumSubGoal = ({ index, subIndex }: PropsWithChildren<{ index: number, subIndex: number }>) =>
    <GoalElement selector={selectCurriculumSubGoal(index, subIndex)} isSubGoal={true} />;

export default CurriculumSubGoal;