/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

import type { Toast } from "../types/toast";

export interface IAppContext {
  user?: any;
  toasts: Toast[];
  setLoading: (loading: boolean) => void;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
}

export const AppContext = createContext<IAppContext>({
  toasts: [],
  setLoading: () => {},
  addToast: () => {},
  removeToast: () => {},
});
