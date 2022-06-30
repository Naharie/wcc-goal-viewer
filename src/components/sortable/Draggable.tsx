import { useDndMonitor, useDraggable } from "@dnd-kit/core";
import React, { PropsWithChildren } from "react";

interface DraggableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    dragId: string;
}

const Draggable = ({ children, dragId, ...props }: PropsWithChildren<DraggableProps>) =>
{
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: dragId
    });
    const style = transform  ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;

    return (
        <div
            {...props}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            {children}
        </div>
    );
};

export default Draggable;