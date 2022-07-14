import useData from "../data";

let goalId = -1;

const findGoalId = () =>
{
    const data = useData.getState();

    for (const curriculumGoal of data.curriculumGoals)
    {
        goalId = Math.max(curriculumGoal.id, goalId);

        for (const child of curriculumGoal.children)
        {
            goalId = Math.max(child.id, goalId);
        }
    }

    for (const track of data.tracks)
    {
        for (const goal of track.goals)
        {
            goalId = Math.max(goal.id, goalId);
        }
    }

    for (const course of data.courses)
    {
        for (const year of course.years)
        {
            for (const semester of year.semesters)
            {
                for (const goal of semester)
                {
                    goalId = Math.max(goal.id, goalId);
                }
            }
        }
    }
};

const nextGoalId = () =>
{
    if (goalId === -1)
    {
        findGoalId();
        goalId++;
    }

    const id = goalId;
    goalId++;
    return id;
}

export default nextGoalId;