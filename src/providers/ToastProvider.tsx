"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ToastMessageType,
  ToastMessageDuration,
  ToastMessageState,
} from "../types/toast";

export interface Toast {
  id: number;
  message: string;
  duration: ToastMessageDuration;
  type: ToastMessageType;
  state: ToastMessageState;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (
    type: ToastMessageType,
    message: string,
    duration: ToastMessageDuration
  ) => void;
  resetToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const addToast = useCallback(
    (
      type: ToastMessageType,
      message: string,
      duration: ToastMessageDuration
    ) => {
      const id = ++idRef.current;

      const toast: Toast = {
        id,
        message,
        duration,
        type,
        state: ToastMessageState.CREATE,
      };

      setToasts((prev) => [...prev, toast]);

      const setToastState = (id: number, state: ToastMessageState) => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, state } : t))
        );
      };

      const autoremoveToast = (id: number, duration: number) => {
        setTimeout(() => {
          setToastState(id, ToastMessageState.GONE);
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
          }, 200);
        }, duration);
      };

      setTimeout(() => {
        setToastState(id, ToastMessageState.VISIBLE);
      }, 50);
      autoremoveToast(id, duration === "short" ? 3000 : 5000);
    },
    []
  );

  const resetToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      resetToasts,
    }),
    [toasts, addToast, resetToasts]
  );

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};

export const useToastContext = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};
