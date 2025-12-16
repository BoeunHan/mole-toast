import { useToastContext } from "../providers/ToastProvider";

export const useToast = () => {
  const { addToast, resetToasts } = useToastContext();

  return {
    longSuccess: (message: string) => addToast("success", message, "long"),
    longError: (message: string) => addToast("error", message, "long"),
    longInfo: (message: string) => addToast("info", message, "long"),
    longWarning: (message: string) => addToast("warning", message, "long"),
    shortSuccess: (message: string) => addToast("success", message, "short"),
    shortError: (message: string) => addToast("error", message, "short"),
    shortInfo: (message: string) => addToast("info", message, "short"),
    shortWarning: (message: string) => addToast("warning", message, "short"),
    clear: () => resetToasts(),
  };
};
