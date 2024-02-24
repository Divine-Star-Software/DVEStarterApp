//import { Approutes } from "Routes";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";

const appRoot = createRoot(document.getElementById("root")!);
appRoot.render(<App />);
