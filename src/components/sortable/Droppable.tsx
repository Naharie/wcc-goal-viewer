import { useDroppable } from "@dnd-kit/core";
import React, { PropsWithChildren } from "react";

interface DroppableProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
    dragId: string;
}

const Droppable = ({ children, dragId, ...props }: PropsWithChildren<DroppableProps>) =>
{
    const {setNodeRef} = useDroppable({ id: dragId });

    return (
        <div {...props} ref={setNodeRef} >
            {children}
        </div>
    );
};

export default Droppable;