import React from 'react';

interface ModalBodyProps {
  type?: 'content' | 'form';
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export default function ModalBody({
  type = 'content',
  onSubmit,
  children,
}: ModalBodyProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <div className="p-4 overflow-y-auto modal-scroll">
      {type === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {children}
        </form>
      ) : (
        children
      )}
    </div>
  );
}
