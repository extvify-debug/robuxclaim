import { createRoot } from "react-dom/client";
import App from "./App"; // This is correct for root-level files
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
