import { ToastMessageState, ToastMessageType } from "../types";
import SuccessIcon from "../icons/SuccessIcon";
import ErrorIcon from "../icons/ErrorIcon";
import WarningIcon from "../icons/WarningIcon";
import InfoIcon from "../icons/InfoIcon";
import { useToastContext } from "../providers/ToastProvider";
import { JSX } from "react";
import React from "react";

const ICON_MAP: Record<ToastMessageType, (props: any) => JSX.Element> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

export const ToastManager = () => {
  const { toasts } = useToastContext();

  return (
    <div className="toast-container">
      {toasts.map(({ id, type, message, state }) => {
        return (
          <ToastItem key={id} type={type} message={message} state={state} />
        );
      })}
    </div>
  );
};

const ToastItem = React.memo(
  ({
    type,
    message,
    state,
  }: {
    type: ToastMessageType;
    message: string;
    state: ToastMessageState;
  }) => {
    const Icon = ICON_MAP[type];

    return (
      <div
        className={`toast-item ${
          state === "visible"
            ? "toast-item-visible"
            : state === "create"
              ? "toast-item-create"
              : "toast-item-hidden"
        }`}
      >
        <Icon className="toast-icon" />
        <p>{message}</p>
      </div>
    );
  },
);
