import React from "react";
import ReactDOM from "react-dom/client";
import "./theme/index.scss";
import "./theme/tailwind.css";

import { DAppKitProvider } from "@mysten/dapp-kit-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { dAppKit } from "./lib/dApp-kit.ts";
import { AppProvider } from "./context/AppProvider.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <DAppKitProvider dAppKit={dAppKit}>
          <App />
        </DAppKitProvider>
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>,
);
