import React, { FC } from "react";
import { DerivedAtom } from "../hooks/useAtom";
import { list } from "../utilities/css";

interface TextBoxProps
{
    selected: boolean;
    isEditing: boolean;
    text: DerivedAtom<string>;
}

const Textbox: FC<TextBoxProps> = ({ text, isEditing, selected }) =>
{
    if (!isEditing)
    {
        return (<>{text.get}</>);
    }

    const computeHeight = (element: HTMLTextAreaElement) =>
    {
        if (element === null || element === undefined)
        {
            return;
        }

        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };
    const onCreate = (element: HTMLTextAreaElement) =>
    {
        if (element == null)
        {
            return;
        }

        element.focus();
        element.selectionStart = element.selectionEnd = text.get.length;
        computeHeight(element);
    }
    const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        text.set(event.target.value);
        computeHeight(event.target);
    };

    return (
        <textarea
            className={list("w-100", selected ? "selected" : "non-selected")}
            defaultValue={text.get}
            onChange={updateText}
            ref={onCreate}
        ></textarea>
    );
};

export default Textbox;