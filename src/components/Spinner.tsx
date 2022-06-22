import { useState } from "react";

const Spinner = () =>
{
    const [visible, setVisible] = useState(false);

    if (!visible)
    {
        setTimeout(() => setVisible(true), 1000);
        return null;
    }

    return (<div className="
        inline-block
        w-48 h-48
        align-text-bottom
        
        border-solid
        border-[0.5em]
        border-green-500
        border-r-transparent
        rounded-full

        animate-spin
    "></div>);
};

export default Spinner;