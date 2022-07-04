import { DndContext, DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import React, { PropsWithChildren, useRef } from "react";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

export interface SortableItem
{
    id: string;
    value: React.ReactNode;
}

interface SortableListProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
{
    dragId: string;
    items: SortableItem[];
    lockXAxis?: boolean;
    allowSorting ?: boolean;

    onSwap: (idA: string, idB: string) => void;

    className?: string;
}

const SortableList = ({ dragId, items, lockXAxis, allowSorting = true, onSwap, ...props }: PropsWithChildren<SortableListProps>) =>
{
    const dragEnd = (event: DragEndEvent) =>
    {
        if (!event.over || event.active.id === event.over.id) return;
        
        const [idA, idB] = [
            event.active.id.toString().replace(dragId, ""),
            event.over.id.toString().replace(dragId, "")
        ];
        
        const indexA = items.findIndex(item => item.id === idA);
        const indexB = items.findIndex(item => item.id === idB);

        if (indexA === -1 || indexB === -1) return;

        onSwap(idA, idB);
    };

    return (
        <DndContext onDragEnd={dragEnd}>
            <ol {...props} className={"flex flex-col justify-center " + (props.className ?? "")}>
                {
                    allowSorting ?
                        items.map(item =>
                            <Droppable key={item.id} dragId={dragId + item.id} className="cursor-pointer">
                                <Draggable dragId={dragId + item.id} lockXAxis={lockXAxis}>
                                    {item.value}
                                </Draggable>
                            </Droppable>
                        ) :
                        items.map(item =>
                            <div key={item.id}>{item.value}</div>
                        )
                }
            </ol>
        </DndContext>
    )
};

export default SortableList;