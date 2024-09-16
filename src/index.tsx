import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "simplebar-react/dist/simplebar.min.css";
import "./css/index.css";
import { getQuery } from "./utilities/query-parameter";
import { enableEditor } from "./data/editor";
import { readScoresFromQuery } from "./data/scores";
import { fetchData } from "./fetchData";

const root = createRoot(document.getElementById("root")!);

// Enable the editor if a query flag named editor exists.
// (?editor=true)
if (getQuery()["editor"] === "true")
{
    enableEditor();
}

fetchData();
window.addEventListener("popstate", () => readScoresFromQuery());

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);