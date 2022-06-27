import { useAtom as _useAtom, Atom, WritableAtom } from "jotai";

declare type Awaited<T> = T extends Promise<infer V> ? Awaited<V> : T;

const useAtom = <T>(atom: WritableAtom<T, T>): [Awaited<T>, (value: T) => void, WritableAtom<T, T>] =>
{
    const [value, setter] = _useAtom(atom);
    return [ value, setter, atom ];
};

export default useAtom;