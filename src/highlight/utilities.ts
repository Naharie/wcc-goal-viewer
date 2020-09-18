import { Highlight } from "./modelds";
import * as _ from "lodash";
import { PrimaryReference, CourseId } from "../models";

export const clearPrimaryGoals = function (highlight: Highlight)
{
    const result: Highlight = {
        primaryGoals: _.cloneDeep(highlight.primaryGoals),
        tracks: highlight.tracks,
        courses: highlight.courses
    };

    _.forEach(result.primaryGoals, primaryGoal =>
    {
        primaryGoal.selected = false;
        _.forEach(primaryGoal.children, goal => goal.selected = false);
    });

    return result;
};

export const getPrimaryGoalReferences = function (highlight: Highlight)
{
    const references: PrimaryReference[] = [];

    _.values(highlight.primaryGoals)
        .sort()
        .forEach(primaryGoal =>
        {
            if (primaryGoal.selected)
            {
                const children = _.values(primaryGoal.children);
                const subGoals =
                    children
                        .filter(child => child.selected)
                        .map(child => child.id);

                references.push({
                    goal: primaryGoal.id,
                    subGoals: subGoals.length === children.length ? [] : subGoals
                });
            }
        });

    return references;
};

export const getTrackGoalReferences = function (highlight: Highlight, course: CourseId)
{
    const references: string[] = [];

    _.values(highlight.tracks[course].goals)
        .sort()
        .filter(goal => goal.selected)
        .map(goal => goal.id)
        .forEach(goal => references.push(goal));

    return references;
};