import useData from "../../..";
import { nextLowercaseLetter, nextUppercaseLetter } from "../../../../utilities/alphabet";
import nextGoalId from "../../../../utilities/goal-id";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const addCurriculumSubGoal = (index: number) =>
{
    useData.getState().update(data =>
    {
        const goal = data.curriculumGoals[index];
        const id = nextGoalId();    
        const ref = goal.children.length === 0 ? "a" : nextLowercaseLetter(goal.children[goal.children.length - 1].ref);

        goal.children.push({
            text: "== PLACEHOLDER ==",
            id, ref
        });;

        useScores.getState().update(scores =>
        {
            scores.curriculumGoals[goal.ref].children[ref] = [];
        });
        useHighlight.getState().update(highlight =>
        {
            highlight.curriculumGoals[goal.ref][ref] = false;
        });
    });
};

export default addCurriculumSubGoal;