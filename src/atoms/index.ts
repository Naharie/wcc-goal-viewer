import { atom, Atom, useAtom, WritableAtom } from "jotai";
import * as _ from "lodash";
import { RecursivePartial } from "../types/recursivePartial";
import { SetStateAction } from "react";

/* If anyone can figure out how to get rid of the final type assertions in this file, that would be amazing */

/**
 * Derives the specified key of the value of the parent atom as an atom.
 * @param parent The parent atom to derive from.
 * @param key The key of the element to derive as an atom.
 */
export const derive = function <T, K extends keyof T> (parent: WritableAtom<T, SetStateAction<T>>, key: K)
{
    type Update = (T[K] extends (infer U)[] ? RecursivePartial<U>[] : T[K] extends object | undefined ? RecursivePartial<T[K]> : T[K]) | undefined;

    return atom (
        get => get(parent)[key] as unknown,
        (get, set, value: Update) =>
        {
            const patch: RecursivePartial<T> = {};
            patch[key] = value;

            set(parent, _.merge (get(parent), patch));
        }
    ) as WritableAtom<T[K], Update>;
};