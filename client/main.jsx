import React from "react";
import { createRoot } from "react-dom/client";
import App from "../imports/ui/App";
import "./main.css";
import "flowbite/dist/flowbite.css";

// Initialize the app after ensuring environment is ready
async function initializeApp() {
  const container = document.getElementById("react-target");
  if (container) {
    const root = createRoot(container);
    root.render(
        <App />
    );
  }
}

// Ensure Meteor is properly loaded before initializing the app
if (typeof Meteor !== 'undefined' && Meteor.startup) {
  Meteor.startup(() => {
    initializeApp();
  });
} else {
  // Fallback for when Meteor.startup is not available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeApp());
  } else {
    initializeApp();
  }
}