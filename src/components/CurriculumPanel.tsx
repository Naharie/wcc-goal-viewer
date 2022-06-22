import { selectCurriculumGoals } from "../data";
import { useAppSelector } from "../hooks/redux";
import SimpleBar from "simplebar-react";

import CurriculumGoal from "./CurriculumGoal";

const CurriculumPanel = () =>
{
    const goals = useAppSelector(selectCurriculumGoals);

    return (
        <SimpleBar style={{ maxHeight: "100%", padding: "0 1em 1em 0" }}>
            <ol className="pr-1 list-[upper-roman] ml-12 my-8">
                {
                    goals.map((goal, index) =>
                        <CurriculumGoal key={goal.id} index={index} />
                    )
                }
            </ol>
        </SimpleBar>
    );
};

export default CurriculumPanel;