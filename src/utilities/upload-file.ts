const upload = (accept: string): Promise<string> =>
{
    const element = document.createElement("input");
    element.className = "hidden";
    element.setAttribute("type", "file");
    element.setAttribute("accept", accept);
    document.body.appendChild(element);

    let _resolve = (value: string) => {};
    let _reject = (reason: string) => {};

    element.onchange = function ()
    {
        document.body.removeChild(element);

        const file = element?.files?.[0];
        
        if (file === undefined) return _reject("User did not select any files");


        const reader = new FileReader();
        reader.onload = event => _resolve(event.target?.result?.toString() ?? "");
        reader.readAsText(file);
    };

    element.click();

    return (new Promise((resolve, reject) =>
    {
        _resolve = resolve;
        _reject = reject;
    }));
};

export default upload;