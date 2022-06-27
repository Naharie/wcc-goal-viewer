import React, { useMemo } from "react";
import { Selector, Writable } from "../data";
import useAtom from "./useAtom";

const useSelector = <T>(selector: (() => Writable<T>) | Selector<T>, ...dependencies: React.DependencyList) =>
{
    const selectorFunction = typeof selector === "function" ? selector : selector[0];
    const atom = useMemo(selectorFunction, dependencies.concat(typeof selector !== "function" ? selector.slice(1) : []));
    return (useAtom(atom));
};

export default useSelector;