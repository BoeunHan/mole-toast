import { useToastContext } from "../providers/ToastProvider";
import { ToastMessageDuration, ToastMessageType } from "../types/toast";

export const useToast = () => {
  const { addToast, resetToasts } = useToastContext();

  return {
    longSuccess: (message: string) =>
      addToast(ToastMessageType.SUCCESS, message, ToastMessageDuration.LONG),
    longError: (message: string) =>
      addToast(ToastMessageType.ERROR, message, ToastMessageDuration.LONG),
    longInfo: (message: string) =>
      addToast(ToastMessageType.INFO, message, ToastMessageDuration.LONG),
    longWarning: (message: string) =>
      addToast(ToastMessageType.WARNING, message, ToastMessageDuration.LONG),
    shortSuccess: (message: string) =>
      addToast(ToastMessageType.SUCCESS, message, ToastMessageDuration.SHORT),
    shortError: (message: string) =>
      addToast(ToastMessageType.ERROR, message, ToastMessageDuration.SHORT),
    shortInfo: (message: string) =>
      addToast(ToastMessageType.INFO, message, ToastMessageDuration.SHORT),
    shortWarning: (message: string) =>
      addToast(ToastMessageType.WARNING, message, ToastMessageDuration.SHORT),
    clear: () => resetToasts(),
  };
};
