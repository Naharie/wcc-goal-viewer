import React, { FC } from "react";
import { list } from "../utilities/css";

interface TextBoxProps
{
    selected: boolean;
    isEditing: boolean;
    text: React.MutableRefObject<string>;
}

const Textbox: FC<TextBoxProps> = ({ text, isEditing, selected }) =>
{
    if (!isEditing)
    {
        return (<>{text.current}</>);
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
        element.selectionStart = element.selectionEnd = text.current.length;
        computeHeight(element);
    }
    const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        const newValue = event.target.value;
        text.current = newValue;
        computeHeight(event.target);
    };

    return (
        <textarea
            className={list("w-100", selected ? "selected" : "non-selected")}
            defaultValue={text.current}
            onChange={updateText}
            ref={onCreate}
        ></textarea>
    );
};

export default Textbox;