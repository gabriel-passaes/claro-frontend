'use client';

import { useModalStore } from '@/stores/modal.store';
import React, { useEffect, useState } from 'react';
import styles from './modal.module.css';

interface ModalProps {
  children: React.ReactNode;
}

const modalSizeClasses = {
  small: 'w-full max-w-md max-h-[400px]',
  medium: 'w-full max-w-lg max-h-[600px]',
  large: 'w-full max-w-2xl max-h-[800px]',
  extra: 'w-full max-w-4xl max-h-[90vh]',
  full: 'w-screen h-screen',
};

const modalTypeClasses = {
  vertical: 'h-auto',
  horizontal: 'w-full max-h-screen',
};

export default function Modal({ children }: ModalProps) {
  const { isOpen, size, type } = useModalStore();

  const [visible, setVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles['modal-enter']);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setAnimationClass(styles['modal-enter']);
    } else if (visible) {
      setAnimationClass(styles['modal-leave']);
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, visible]);

  if (!visible) return null;

  const combinedClasses =
    size === 'full'
      ? modalSizeClasses.full
      : `${modalSizeClasses[size]} ${modalTypeClasses[type]}`;

  return (
    <div className="fixed inset-0 bg-dark-300 bg-opacity-70 flex items-center justify-center z-50">
      <div
        className={`
          bg-light-100 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col overflow-hidden
          ${combinedClasses}
          ${styles['modal-scroll']}
          ${animationClass}
        `}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
