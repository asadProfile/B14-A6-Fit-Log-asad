"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlertIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
} from "@/components/icons";
import { cx } from "@/lib/utils";

export type ToastVariant = "success" | "info" | "error";

export type Toast = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismiss: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);
const TOAST_TTL = 2800;

const VARIANT_STYLES: Record<
  ToastVariant,
  { border: string; icon: typeof CheckIcon; iconColor: string }
> = {
  success: {
    border: "border-l-accent/70",
    icon: CheckIcon,
    iconColor: "text-accent",
  },
  info: { border: "border-l-white/30", icon: InfoIcon, iconColor: "text-white/70" },
  error: {
    border: "border-l-red-500/70",
    icon: AlertIcon,
    iconColor: "text-red-400",
  },
};

/** App-wide toast host. Mounted once in the root layout. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({ title, description, variant = "success" }: ToastInput) => {
      const id = nextId.current++;
      setToasts((current) => [...current.slice(-2), { id, title, description, variant }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), TOAST_TTL),
      );
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((timer) => clearTimeout(timer));
      pending.clear();
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
        role="region"
        aria-label="Notifications"
      >
        {toasts.map((item) => {
          const styles = VARIANT_STYLES[item.variant];
          const ToastIcon = styles.icon;

          return (
            <div
              key={item.id}
              role="status"
              aria-live="polite"
              className={cx(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-white/10 border-l-2 bg-surface-soft/95 px-4 py-3 shadow-card backdrop-blur",
                "animate-toast-in",
                styles.border,
              )}
            >
              <ToastIcon className={cx("mt-0.5 size-5 shrink-0", styles.iconColor)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                {item.description ? (
                  <p className="mt-0.5 text-xs leading-relaxed text-white/60">
                    {item.description}
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
                className="rounded-md p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside <ToastProvider>.");
  }
  return context;
}
