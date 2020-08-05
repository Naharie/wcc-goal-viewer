import React, { FC, useRef, createRef } from "react";
import { list } from "../utilities";

interface TextBoxProps
{
    selected: boolean;
    isEditing: boolean;
    text: string;
}

const Textbox: FC<TextBoxProps> = ({ text, isEditing, selected }) =>
{
    const value = useRef(text);

    if (!isEditing)
    {
        return (<>{text}</>);
    }

    const computeHeight = (element: HTMLTextAreaElement) =>
    {
        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    };
    const updateText = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        const newValue = event.target.value;
        value.current = newValue;
        computeHeight(event.target);
    };

    return (
        <textarea
            className={list("w-100", selected ? "selected" : "non-selected")}
            defaultValue={text}
            onChange={updateText}
            ref={computeHeight}
        ></textarea>
    );
};

export default Textbox;