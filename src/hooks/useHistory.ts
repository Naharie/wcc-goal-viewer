import { useEffect, useState } from "react";

const useHistoryState = <T>(defaultValue: T): [ T, (value: T) => void ] =>
{
    const [state, setState] = useState<T>(
        history.state === undefined || history.state === null ?
            defaultValue :
            history.state
    );

    useEffect(() =>
    {
        const handler = (event: PopStateEvent) =>
        {
            setState(event.state);
        };

        window.addEventListener("popstate", handler);
        return (() => window.removeEventListener("popstate", handler));
    }, []);

    const setter = (value: T) =>
    {
        history.replaceState(value, document.title, location.toString());
        setState(value);
    };

    return ([ state, setter ]);
};

export default useHistoryState;