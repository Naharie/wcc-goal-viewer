import type { Goal } from "../data/validation";

const swapGoals = (goals: Goal[], a: string, b: string): [boolean, string, string] =>
{
    const indexA = goals.findIndex(goal => goal.id.toString() === a);
    const indexB = goals.findIndex(goal => goal.id.toString() === b);

    if (indexA === -1 || indexB === -1)
    {
        return [false, "", ""];
    }

    const [goalA, goalB] = [goals[indexA], goals[indexB]];
    const [refA, refB] = [goalA.ref, goalB.ref];

    [goalA.ref, goalB.ref] = [refB, refA];

    goals[indexA] = goalB;
    goals[indexB] = goalA;

    return [true, refA, refB];
};

export default swapGoals;