import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Dashboard from "./Dashboard.jsx";
import Projects from "./Projects.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Projects />
  </StrictMode>,
);
