import useData from "../../..";
import nextGoalId from "../../../../utilities/goal-id";
import { nextRomanNumeral } from "../../../../utilities/roman-numerals";
import useHighlight from "../../../highlight";
import useScores from "../../../scores";

const addCurriculumGoal = () =>
{
    useData.getState().update(data =>
    {
        const goals = data.curriculumGoals;
        const id = nextGoalId();    
        const ref = goals.length === 0 ? "I" : nextRomanNumeral(goals[goals.length - 1].ref);

        goals.push({
            text: "== PLACEHOLDER ==",
            id, ref,
            children: []
        });

        useScores.getState().update(scores =>
        {
            scores.curriculumGoals[ref] = { score: [], children: {} };
        });
        useHighlight.getState().update(highlight =>
        {
            highlight.curriculumGoals[ref] = { self: false };
        });
    });
};

export default addCurriculumGoal;