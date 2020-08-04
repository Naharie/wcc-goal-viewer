import { useEffect, useRef } from "react";

const useInitialize = (effect: () => boolean) =>
{
    const hasFired = useRef(false);

    useEffect (() =>
    {
        if (!hasFired.current)
        {
            hasFired.current = effect();
        }
    }, [ effect ]);
};

export default useInitialize;