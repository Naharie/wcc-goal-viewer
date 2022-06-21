import { selectCurriculumGoals } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";

import CurriculumGoal from "./CurriculumGoal";

const CurriculumGoalPanel = () =>
{
    const goals = useAppSelector(selectCurriculumGoals);

    return (
        <SimpleBar style={{ maxHeight: "100%", padding: "0 1em 1em 0" }}>
            <ol type="I" className="pr-1">
                {
                    goals.map((goal, index) =>
                        <CurriculumGoal key={goal.id} index={index} />
                    )
                }
            </ol>
        </SimpleBar>
    );
};

export default CurriculumGoalPanel;