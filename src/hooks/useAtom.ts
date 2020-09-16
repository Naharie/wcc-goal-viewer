import { useState } from "react";
import * as _ from "lodash";
import { RecursivePartial } from "../types/recursivePartial";

export interface Writeable<T, U>
{
    set: (value: U | ((value: T) => U)) => void;
}
export interface Atom<T> extends Writeable<T, T>
{
    get: T;
}
export interface DerivedAtom<T> extends Writeable<T, RecursivePartial<T>>
{
    get: T;
}

export const useAtom = function <T>(initialValue: T): Atom<T>
{
    const [get, set] = useState(initialValue);
    return ({ get, set });
};
export const makeAtom = function <T>(value: T, set: ((value: T | ((value: T) => T)) => void)): Atom<T>
{
    return ({ get: value, set });
};

export const derive = function <T, K extends keyof T>(
    atom: Atom<T> | DerivedAtom<T>,
    key: K,
    onSet?: (value: T[K], total: T) => T
): DerivedAtom<T[K]>
{
    return ({
        get: atom.get[key],
        set: value =>
        {
            if (typeof value === "function")
            {
                atom.set(current =>
                {
                    const result = _.merge(current, { [key]: value(current[key]) }); 
                    
                    if (onSet)
                    {
                        return onSet(result[key], result);
                    }
                    
                    return result;
                });
                return;
            }

            const result = _.merge(atom.get, { [key]: value });

            if (onSet)
            {
                atom.set (onSet(result[key], result));
                return;
            }

            atom.set(result);
        }
    });
};

export const readAtom = function <T, U>(atom: (Atom<T> | DerivedAtom<T>) & Writeable<T, U>): [T, (value: U) => void]
{
    return ([atom.get, atom.set]);
};