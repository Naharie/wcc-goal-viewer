import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import React, { PropsWithChildren } from "react";

interface DraggableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    dragId: string;
    lockXAxis?: boolean;
}

const Draggable = ({ children, dragId, lockXAxis, ...props }: PropsWithChildren<DraggableProps>) =>
{
    const {attributes, listeners, setNodeRef, transform} = useDraggable({ id: dragId });
    const style = transform  ? {
        transform: `translate(${lockXAxis ? 0 : transform.x}px, ${transform.y}px)`
    } : undefined;

    return (
        <div {...props} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {children}
        </div>
    );
};

export default Draggable;