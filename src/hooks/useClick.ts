import React, { useCallback, useRef } from "react";

const useClick = <T = Element>(handler: (event: React.MouseEvent<T>) => void) =>
{
    const mousePosition = useRef({ x: 0, y: 0});

    const mouseDown = useCallback((event: React.MouseEvent<T>) =>
    {
        mousePosition.current = { x: event.clientX, y: event.clientY };
    }, []);
    const mouseUp = useCallback((event: React.MouseEvent<T>) =>
    {
        if (event.target !== event.currentTarget) return;

        var distX = Math.abs(event.clientX - mousePosition.current.x);
        var distY = Math.abs(event.clientY - mousePosition.current.y);

        if (distX !== 0|| distY !== 0) return;
        handler(event);
    }, [ handler ]);

    return [ mouseDown, mouseUp ];
};

export default useClick;