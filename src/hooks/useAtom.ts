import { useState } from "react";
import * as _ from "lodash";
import { RecursivePartial } from "../types/recursivePartial";

export interface Writeable<T, U>
{
    set: (value: U | ((value : T) => U)) => void;
}
export interface Atom<T> extends Writeable<T, T>
{
    get: T;
}
export interface TransformedAtom<T> extends Writeable<T, RecursivePartial<T>>
{
    get: T;
}

export const atom = function <T>(initialValue: T): Atom<T>
{
    const [get, set] = useState(initialValue);
    return ({ get, set });
};

export const derive = function <T, K extends keyof T>(atom: Atom<T> | TransformedAtom<T>, key: K): TransformedAtom<T[K]>
{
    return ({
        get: atom.get[key],
        set: value =>
        {
            if (typeof value === "function")
            {
                atom.set(current => _.merge(current, value(current[key])));
                return;
            }

            atom.set(_.merge(atom.get, value));
        }
    });
};

export const useAtom = function <T, U>(atom: (Atom<T> | TransformedAtom<T>) & Writeable<T, U> ): [T, (value: U) => void]
{
    return ([ atom.get, atom.set ]);
};