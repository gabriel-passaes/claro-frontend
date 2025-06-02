'use client';

import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center !bg-primary-400 dark:!bg-primary-900 transition-colors duration-300 px-4 relative">
      <div className="absolute top-4 right-4 text-2xl text-light-100">
        <ThemeToggle />
      </div>

      <main className="w-full max-w-md">{children}</main>
    </div>
  );
}
