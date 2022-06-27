import SimpleBar from "simplebar-react";
import CurriculumGoal from "./CurriculumGoal";
import store from "../../data";
import { useSnapshot } from "valtio";

const CurriculumPanel = () =>
{
    const view = useSnapshot(store);

    return (
        <SimpleBar style={{ maxHeight: "100%", padding: "0 1em 1em 0" }}>
            <ol className="pr-1 list-[upper-roman] ml-12 my-8">
                {
                    view.data.curriculumGoals.map((goal, index) =>
                        <CurriculumGoal key={goal.id} goal={index} />
                    )
                }
            </ol>
        </SimpleBar>
    );
};

export default CurriculumPanel;