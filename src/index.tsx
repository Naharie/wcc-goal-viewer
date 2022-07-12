import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "simplebar-react/dist/simplebar.min.css";
import "./css/index.css";
import { getQuery } from "./utilities/query-parameter";
import { enableEditor } from "./data/actions/editor";

const root = createRoot(document.getElementById("root")!);

// Enable the editor if a query flag named editor exists.
// (?editor=true)
if (getQuery()["editor"] === "true")
{
    enableEditor();
}

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);