import { useModalStore } from '@/stores/modal.store';
import React from 'react';

interface ModalHeaderProps {
  title: string;
  icon?: React.ReactNode;
  background?: 'primary' | 'secondary' | 'terciary' | 'quaternary' | 'red';
  onClose?: () => void;
}

const bgColorClassMap: Record<string, string> = {
  primary: '!bg-primary-400',
  secondary: '!bg-primary-600',
  terciary: '!bg-primary-800',
  quaternary: '!bg-primary-900',
  red: '!bg-red-600',
};

export default function ModalHeader({
  title,
  icon,
  background = 'primary',
  onClose,
}: ModalHeaderProps) {
  const { closeModal } = useModalStore();

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 text-light-100 ${bgColorClassMap[background]}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <button
        onClick={onClose || closeModal}
        aria-label="Fechar modal"
        className="p-2 rounded hover:bg-dark-300/10 transition"
      >
        <i className="pi pi-times text-light-100 text-xl" />
      </button>
    </div>
  );
}
