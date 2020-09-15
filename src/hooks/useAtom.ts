import { useState } from "react";
import * as _ from "lodash";
import { RecursivePartial } from "../types/recursivePartial";

export interface Writeable<V>
{
    set: (value: V) => void;
}
export interface Atom<T> extends Writeable<T>
{
    get: T;
}
export interface TransformedAtom<T> extends Writeable<RecursivePartial<T>>
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
            atom.set(_.merge(atom.get, value));
        }
    });
};

export const useAtom = function <T, U>(atom: (Atom<T> | TransformedAtom<T>) & Writeable<U> ): [T, (value: U) => void]
{
    return ([ atom.get, atom.set ]);
};