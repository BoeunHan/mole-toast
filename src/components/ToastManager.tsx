import { ToastMessageState, ToastMessageType } from "../types/toast";
import SuccessIcon from "../icons/SuccessIcon";
import ErrorIcon from "../icons/ErrorIcon";
import WarningIcon from "../icons/WarningIcon";
import InfoIcon from "../icons/InfoIcon";
import { useToastListStore } from "../store/useToastListStore";

const ICON_MAP = {
  [ToastMessageType.SUCCESS]: SuccessIcon,
  [ToastMessageType.ERROR]: ErrorIcon,
  [ToastMessageType.WARNING]: WarningIcon,
  [ToastMessageType.INFO]: InfoIcon,
};

export const ToastManager = () => {
  const { toasts } = useToastListStore();

  return (
    <div className="toast-container">
      {toasts.map(({ id, type, message, state }) => {
        const Icon = ICON_MAP[type];
        return (
          <div
            key={id}
            className={`toast-item ${
              state === ToastMessageState.VISIBLE
                ? "toast-item-visible"
                : state === ToastMessageState.CREATE
                ? "toast-item-create"
                : "toast-item-hidden"
            }`}
          >
            <Icon className="toast-icon" />
            <p>{message}</p>
          </div>
        );
      })}
    </div>
  );
};
