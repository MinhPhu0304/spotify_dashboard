import React from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import App from "./App";

Sentry.init({
  dsn:
    "https://9952a3b5299a4ea390ae67e2fea711c9@o265348.ingest.sentry.io/6448816",
  integrations: [new BrowserTracing()],
  enabled: process.env.NODE_ENV === "production",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
