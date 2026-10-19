import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react';

export type ToastVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type ToastOptions = {
  description?: ReactNode;
  duration?: number;
  id?: string;
  title: ReactNode;
  variant?: ToastVariant;
};

export type ToastProps = Omit<ToastOptions, 'duration' | 'id'> & {
  onClose?: () => void;
};

type ToastRecord = ToastOptions & { id: string };

type ToastContextValue = {
  dismissToast: (id: string) => void;
  toast: (options: ToastOptions) => string;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function Toast({ description, onClose, title, variant = 'neutral' }: ToastProps) {
  const role = variant === 'danger' ? 'alert' : 'status';

  return (
    <div className="gpmh-toast" data-variant={variant} role={role}>
      <div className="gpmh-toast__indicator" aria-hidden="true" />
      <div className="gpmh-toast__copy">
        <strong>{title}</strong>
        {description ? <p>{description}</p> : null}
      </div>
      {onClose ? <button className="gpmh-toast__close" type="button" onClick={onClose} aria-label="알림 닫기">×</button> : null}
    </div>
  );
}

export type ToastProviderProps = {
  children: ReactNode;
  duration?: number;
};

export function ToastProvider({ children, duration: defaultDuration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismissToast = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const toast = useCallback((options: ToastOptions) => {
    const id = options.id ?? `gpmh-toast-${++counter.current}`;
    const nextToast: ToastRecord = { ...options, id };
    const existingTimer = timers.current.get(id);
    if (existingTimer) clearTimeout(existingTimer);

    setToasts((current) => [...current.filter((item) => item.id !== id), nextToast]);

    const duration = options.duration ?? defaultDuration;
    if (duration > 0) {
      timers.current.set(id, setTimeout(() => dismissToast(id), duration));
    }
    return id;
  }, [defaultDuration, dismissToast]);

  useEffect(() => () => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
  }, []);

  return (
    <ToastContext.Provider value={{ dismissToast, toast }}>
      {children}
      <div className="gpmh-toast-viewport" aria-label="알림" aria-live="polite" aria-relevant="additions">
        {toasts.map(({ id, ...item }) => <Toast key={id} {...item} onClose={() => dismissToast(id)} />)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider.');
  return context;
}
