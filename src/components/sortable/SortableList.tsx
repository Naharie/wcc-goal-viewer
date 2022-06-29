import React from "react";
import { ReactNode, useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import SortableItem from "./SortableItem";

export interface SortableItem
{
	id: string;
	props?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
	value: ReactNode;
}

interface SortableListProps extends React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>
{
	items: SortableItem[];
	allowSorting?: boolean;
	dragId: string
}

export const SortableList = ({ items: _items, allowSorting = true, dragId, ...listProps }: SortableListProps) =>
{
	const [items, setItems] = useState(_items)

	const findItem = useCallback(
		(id: string) =>
        {
            for (let index = 0; index < items.length; index++)
            {
                if (items[index].id === id) return index;
            }

            return -1;
		},
		[items],
	);
	const moveItem = useCallback(
		(id: string, target: number) =>
        {
			const index = findItem(id);

			setItems(items.map((v, i) =>
                i === index ? items[target] :
                i === target ? items[index] : v
            ));
		},
		[findItem, items, setItems],
	);

	const [, drop] = useDrop(() => ({ accept: dragId }));
	
	if (allowSorting)
	{
		return (
			<ol ref={drop} {...listProps}>
				{items.map(item =>
					<SortableItem key={item.id} id={item.id} dragId={dragId} move={moveItem} find={findItem} props={item.props}>{item.value}</SortableItem>
				)}
			</ol>
		);
	}
	else
	{
		return (
			<ol {...listProps}>
				{items.map(item =>
					<div key={item.id} {...item.props}>{item.value}</div>
				)}
			</ol>
		);
	}
};

export default SortableList;