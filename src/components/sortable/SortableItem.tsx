import { PropsWithChildren } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DraggableProps
{
    id: string;
	dragId: string;

    move: (id: string, to: number) => void;
    find: (id: string) => number;

	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

interface Item
{
    id: string;
    originalIndex: number;
}

const SortableItem = ({ id, dragId, children, move, find, props }: PropsWithChildren<DraggableProps>) =>
{
    const originalIndex = find(id);

    const [{ isDragging }, drag] = useDrag(
		() => ({
			type: dragId,
			item: { id, originalIndex },
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
			end: (item, monitor) => {
				const { id, originalIndex } = item
				const didDrop = monitor.didDrop();
				
				if (!didDrop)
				{
					move(id, originalIndex)
				}
			},
		}),
		[id, originalIndex, move],
	);

	const [, drop] = useDrop(
		() => ({
			accept: dragId,
			hover({ id: draggedId }: Item)
			{
				if (draggedId !== id)
				{
					const overIndex = find(id);
					move(draggedId, overIndex)
				}
			},
		}),
		[find, move],
	);

	const opacity = isDragging ? 0 : 1;

	return (
		<div ref={(node) => drag(drop(node))} {...props} className={"cursor-grab " + (props?.className ?? "")} style={{ ...props?.style, opacity }}>
			{children}
		</div>
	)
};

export default SortableItem;