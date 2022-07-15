const download = (filename: string, value: string) =>
{
    const element = document.createElement("a");
    element.className = "hidden";
    element.setAttribute("href", "data:text/plain;charset=utf-8, " + encodeURIComponent(value));
    element.setAttribute("download", filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
};

export default download;