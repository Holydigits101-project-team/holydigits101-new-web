import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const toast = {
    success: (msg: string) => addToast(msg, 'success'),
    error: (msg: string) => addToast(msg, 'error'),
    info: (msg: string) => addToast(msg, 'info'),
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`backdrop-blur-xl border rounded-xl p-4 shadow-2xl flex items-start space-x-3 transition-all duration-300 ${
                t.type === 'success'
                  ? 'bg-black/80 border-yellow-500/30 shadow-yellow-500/5'
                  : t.type === 'error'
                  ? 'bg-black/80 border-red-500/30 shadow-red-500/5'
                  : 'bg-black/80 border-blue-500/30 shadow-blue-500/5'
              }`}>
                {/* Icon wrapper */}
                <div className="flex-shrink-0 mt-0.5">
                  {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-yellow-400" />}
                  {t.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                  {t.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
                </div>

                {/* Message text */}
                <div className="flex-1 text-sm font-medium text-gray-200">
                  {t.message}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => removeToast(t.id)}
                  className="flex-shrink-0 text-gray-500 hover:text-gray-300 transition-colors p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
