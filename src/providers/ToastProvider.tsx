"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  ToastMessageType,
  ToastMessageDuration,
  ToastMessageState,
} from "../types";

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
  const timersRef = useRef<number[]>([]);

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
        state: "create",
      };

      setToasts((prev) => [...prev, toast]);

      const setToastState = (id: number, state: ToastMessageState) => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, state } : t))
        );
      };

      const registerTimer = (timer: number) => {
        timersRef.current.push(timer);
      };

      const autoRemoveToast = (id: number, duration: number) => {
        registerTimer(
          setTimeout(() => {
            setToastState(id, "gone");
            registerTimer(
              setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
              }, 200)
            );
          }, duration)
        );
      };

      const showToast = (id: number) => {
        registerTimer(
          setTimeout(() => {
            setToastState(id, "visible");
          }, 50)
        );

        autoRemoveToast(id, duration === "short" ? 3000 : 5000);
      };

      showToast(id);
    },
    []
  );

  const resetToasts = useCallback(() => {
    setToasts([]);
  }, []);

  useEffect(() => {
    return () => {
      for (const timer of timersRef.current) {
        clearTimeout(timer);
      }
      timersRef.current = [];
    };
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
