import { RecursivePartial } from "../types/recursivePartial";
import _ from "lodash";

/**
 * Deep compares two objects and returns a new object representing the set of changes.
 * In other words, the output of this function is what you need to put in with _.merge to recreate "after" from "before".
 * @param before The object to be compared with.
 * @param after The object to compare.
 */
export const difference = function <T>(before: T, after: T): RecursivePartial<T>
{
    if (Array.isArray(before) && Array.isArray(after))
    {
        const result: unknown[] = [];

        for (let index = 0; index < after.length; index++)
        {
            result.push(difference(before[index], after[index]));
        }

        return result as RecursivePartial<T>;
    }
    else if (typeof before === "object" && typeof after === "object")
    {
        const result: { [key: string]: unknown } = {};

        for (const key of Object.getOwnPropertyNames(before))
        {
            if (!(key in after))
            {
                // Not quite true, but as close as we can get.
                result[key] = undefined;
            }
        }

        for (const [key, value] of Object.entries(after))
        {
            if (!_.isEqual(before[key as keyof T], value))
            {
                result[key] = difference(before[key as keyof T], value);
            }
        }

        return result as RecursivePartial<T>;
    }
    
    return after;
};