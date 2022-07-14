import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "simplebar-react/dist/simplebar.min.css";
import "./css/index.css";
import { getQuery } from "./utilities/query-parameter";
import useEditor from "./data/editor";

const root = createRoot(document.getElementById("root")!);

// Enable the editor if a query flag named editor exists.
// (?editor=true)
if (getQuery()["editor"] === "true")
{
    useEditor.getState().enableEditor();
    useEditor.getState().openEditor(21);
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);