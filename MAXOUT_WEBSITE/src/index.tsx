import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./firebase"; // ✅ initialize Firebase before App
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: measure performance (logs or analytics)
reportWebVitals();


