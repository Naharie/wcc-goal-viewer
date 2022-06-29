import React, { useRef, useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

interface TextAreaProps
{
    value?: string;
}

const TextArea = (props: TextAreaProps) =>
{
    const [text, setText] = useState(props.value ?? "");

    const update = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    {
        setText(event.target.value);
    };

    return (
        <ReactTextareaAutosize
            value={text}
            disabled
            className="resize-none focus:outline-none w-full overflow-hidden bg-not-selected default:bg-not-selected"
            onChange={update} 
        />
    )
};

export default TextArea;