import {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import type { Toast } from "../types/toast";
import { AppContext, type IAppContext } from "./AppContext";
import { useObservability } from "../hooks/useObservability";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const observability = useObservability();

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

 const setLoading = useCallback((loading: boolean) => {
    // Implement global loading state if needed
  },[])
  const contextValue: IAppContext = useMemo(
    () => ({
      toasts,
      setLoading,
      addToast,
      removeToast,
      observability
    }),
    [toasts, setLoading, addToast, removeToast, observability],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
