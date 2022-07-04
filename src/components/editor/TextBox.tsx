import React, { useLayoutEffect, useRef, useState } from "react";

interface TextBoxProps
{
    value?: string;
    className?: string;
}

const TextBox = (props: TextBoxProps) =>
{
    const [text, setText] = useState(props.value ?? "");
    const ref = useRef<HTMLInputElement>(null);

    const update = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setText(event.target.value);
    };

    useLayoutEffect(() =>
    {
        if (!ref.current) return;

        debugger;

        const input = ref.current;
        input.style.width = input.scrollWidth + "px";
    }, []);

    return (
        <input type="text"
            value={text}
            ref={ref}
            className={("focus:outline-none overflow-hidden bg-not-selected default:bg-not-selected ") + (props.className ?? "")}
            onChange={update}
        />
    )
};

export default TextBox;