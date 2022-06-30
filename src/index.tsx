import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

import "simplebar-react/dist/simplebar.min.css";
import "./css/index.css";
import store from "./data";
import { getQuery } from "./utilities/query-parameter";

const root = createRoot(document.getElementById("root")!);
store.editorEnabled = getQuery()["editor"] === "true";

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);