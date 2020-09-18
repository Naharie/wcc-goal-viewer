import { Highlight } from "./modelds";
import * as _ from "lodash";

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