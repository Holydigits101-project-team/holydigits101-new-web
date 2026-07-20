import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Award, Check } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type?: 'success' | 'confirm' | 'info';
  confirmText?: string;
  onConfirm?: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  type = 'info',
  confirmText = 'Confirm',
  onConfirm,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-[#0B1120] to-black p-8 shadow-2xl shadow-yellow-500/5 text-white"
          >
            {/* Branded Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-1"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon Banner if success */}
            {type === 'success' && (
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                  <Award className="w-8 h-8 text-black" />
                </div>
              </div>
            )}

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold font-['Orbitron'] tracking-wide mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-amber-400">
              {title}
            </h2>

            {/* Content */}
            <div className="text-gray-300 text-sm sm:text-base mb-8 text-center leading-relaxed font-sans">
              {children}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {onConfirm && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-yellow-500/30 transition-all cursor-pointer"
                >
                  <Check className="w-5 h-5" />
                  <span>{confirmText}</span>
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold border transition-all cursor-pointer ${
                  onConfirm 
                    ? 'border-white/10 hover:bg-white/5 text-gray-300' 
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/20 border-transparent'
                }`}
              >
                <span>{onConfirm ? 'Cancel' : 'Great!'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
