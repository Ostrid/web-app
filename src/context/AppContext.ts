/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

import type { Toast } from "../types/toast";
import { OstridNode, OstridEdge, OstridEvent } from "../types/observer";

export interface IAppContext {
  user?: any;
  toasts: Toast[];
  setLoading: (loading: boolean) => void;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  observability?: {
    nodes: OstridNode[];
    edges: OstridEdge[];
    events: OstridEvent[];
    isConnected: boolean;
  };
}

export const AppContext = createContext<IAppContext>({
  toasts: [],
  setLoading: () => {},
  addToast: () => {},
  removeToast: () => {},
  observability:{
    nodes: [],
    edges: [],
    events: [],
    isConnected: false,
  }
});
