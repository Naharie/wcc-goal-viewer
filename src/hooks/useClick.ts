import React, { useCallback, useRef } from "react";

/**
 * Returns a mouse down function and a mouse up function that together simulate a mouse click.
 * This is necessary because normal clicks can't be registered on draggable elements.
 * @param handler The function to run on click.
 * @returns A mouse down function and a mouse up function.
 */
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