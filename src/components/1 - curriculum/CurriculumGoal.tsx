import { PropsWithChildren } from "react";
import { selectCurriculumSubGoal, Selector } from "../../data";
import useSelector from "../../hooks/useSelector";
import { CurriculumGoal as CurriculumGoalData } from "../../data/types";
import CurriculumSubGoal from "./CurriculumSubGoal";

interface CurriculumGoalProps
{
    selector: Selector<CurriculumGoalData>;
}

const CurriculumGoal = ({ selector }: PropsWithChildren<CurriculumGoalProps>) =>
{
    const [goal,, atom] = useSelector(selector);

    return (
        <li className="mb-6 list-item">
            {goal.text}
            <ol className="list-[lower-alpha] mt-1">
                {
                    goal.children.map((goal, index) =>
                        <CurriculumSubGoal key={goal.id} selector={[selectCurriculumSubGoal(atom, index), index]} />
                    )
                }
            </ol>
        </li>
    );
};

export default CurriculumGoal;