import Image from 'next/image'
import { Button } from 'primereact/button'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './header.module.css'
import { HeaderProps } from './header.types'

export default function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header
      className={`${styles.headerContainer} bg-light-100 dark:bg-dark-100 text-dark-100 dark:text-light-100 relative z-10`}
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <div className="absolute bottom-0 left-0 w-full h-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_4px_rgba(255,255,255,0.06)] pointer-events-none z-[-1]" />

      <div className={styles.leftGroup}>
        <Button
          icon="pi pi-bars"
          className={`${styles.iconBtn} text-primary-500`}
          onClick={onToggleSidebar}
          text
          aria-label="Abrir ou fechar menu lateral"
          title="Menu"
        />
      </div>

      <div className="flex items-center gap-3">
        <div
          className={styles.iconWrapper}
          tabIndex={0}
          role="button"
          aria-label="Abrir notificações"
          title="Notificações"
        >
          <i className="pi pi-bell text-xl" aria-hidden="true"></i>
          <span className={styles.notificationsBadge} aria-label="2 notificações não lidas">
            2
          </span>
        </div>

        <ThemeToggle />

        <div
          className={styles.avatar}
          role="img"
          aria-label="Avatar do usuário"
          title="Perfil do usuário"
        >
          <Image
            src="/avatar.svg"
            alt="Avatar do usuário"
            width={36}
            height={36}
            priority
          />
        </div>
      </div>
    </header>
  )
}
