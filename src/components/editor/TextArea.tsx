import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface TextAreaProps
{
    value?: string;
    textChanged?: (value: string) => void;
}

const TextArea = (props: TextAreaProps) =>
{
    const [text, setText] = useState(props.value ?? "");

    const update = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setText(event.target.value);
        props.textChanged?.(event.target.value);
    };

    return (
        <ReactTextareaAutosize
            value={text}
            className="resize-none focus:outline-none w-full overflow-hidden bg-not-selected default:bg-not-selected rounded-md"
            onChange={update}
        />
    )
};

export default TextArea;