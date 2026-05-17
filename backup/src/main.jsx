import "./fetch-shim.js";
import React from "react";
import { createRoot } from "react-dom/client";
import HTSBookingAssistant from "../hts-starter-prototype.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HTSBookingAssistant />
  </React.StrictMode>
);
