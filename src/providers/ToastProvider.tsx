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
    duration: ToastMessageDuration,
  ) => void;
  resetToasts: () => void;
}

const MAX_CNT = 5;

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const idRef = useRef(0);
  const timersRef = useRef<Map<number, number[]>>(new Map());

  const registerTimer = (id: number, timer: number) => {
    const timers = timersRef.current.get(id) || [];
    timers.push(timer);
    timersRef.current.set(id, timers);
  };

  const clearToastTimers = (id: number) => {
    const timers = timersRef.current.get(id);
    if (timers) {
      timers.forEach(clearTimeout);
      timersRef.current.delete(id);
    }
  };

  const setToastState = (id: number, state: ToastMessageState) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, state } : t)));
  };

  const autoRemoveToast = (id: number, duration: number) => {
    registerTimer(
      id,
      setTimeout(() => {
        setToastState(id, "gone");
        registerTimer(
          id,
          setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
            clearToastTimers(id);
          }, 200),
        );
      }, duration),
    );
  };

  const showToast = (id: number, duration: ToastMessageDuration) => {
    registerTimer(
      id,
      setTimeout(() => {
        setToastState(id, "visible");
      }, 50),
    );

    autoRemoveToast(id, duration === "short" ? 3000 : 5000);
  };

  const clearAllToastTimers = () => {
    timersRef.current.forEach((timers) => {
      timers.forEach(clearTimeout);
    });
    timersRef.current.clear();
  };

  const addToast = useCallback(
    (
      type: ToastMessageType,
      message: string,
      duration: ToastMessageDuration,
    ) => {
      const id = ++idRef.current;
      const toast: Toast = {
        id,
        message,
        duration,
        type,
        state: "create",
      };

      setToasts((prev) => {
        let next = [...prev, toast];

        if (next.length > MAX_CNT) {
          const oldest = next[0];
          clearToastTimers(oldest.id);
          next = next.slice(1);
        }

        return next;
      });

      showToast(id, duration);
    },
    [],
  );

  const resetToasts = useCallback(() => {
    setToasts([]);
    clearAllToastTimers();
  }, []);

  useEffect(() => {
    return () => {
      clearAllToastTimers();
    };
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      resetToasts,
    }),
    [toasts, addToast, resetToasts],
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
