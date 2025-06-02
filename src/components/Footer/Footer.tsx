'use client'

import Image from 'next/image'
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer
      className={`px-6 py-4 relative z-10 bg-light-100 text-dark-100 dark:bg-dark-100 dark:text-light-100`}
    >
      {/* Linha de separação superior */}
      <div className="absolute top-0 left-0 w-full h-0.5 shadow-[0_-2px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_4px_rgba(255,255,255,0.06)] pointer-events-none z-[-1]" />

      <div className={`${styles.footerContent}`}>
        <Image
          src="/logo-claro.svg"
          alt="Logo Claro"
          width={28}
          height={28}
          className="inline-block"
          priority
        />
        <span className="h-6 flex items-center text-sm font-medium">
          © 2025 - Claro Frontend - Feito Com ❤️ por Gabriel Passaes
        </span>
      </div>
    </footer>
  )
}
