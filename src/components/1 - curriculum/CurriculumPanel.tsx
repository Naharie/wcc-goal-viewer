import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import { curriculumGoalsAtom, selectCurriculumGoal } from "../../data";
import { useAtom } from "jotai";

const CurriculumPanel = () =>
{
    const [goals] = useAtom(curriculumGoalsAtom);

    return (
        <SimpleBar style={{ maxHeight: "100%", padding: "0 1em 1em 0" }}>
            <ol className="pr-1 list-[upper-roman] ml-12 my-8">
                {
                    goals.map((goal, index) =>
                        <CurriculumGoal key={goal.id} selector={[selectCurriculumGoal(index), index]} />
                    )
                }
            </ol>
        </SimpleBar>
    );
};

export default CurriculumPanel;