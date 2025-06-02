'use client'

import { clearToken } from '@/stores/auth.store'
import { useAppDispatch } from '@/stores/hooks'
import { useSidebarStore } from '@/stores/sidebar.store'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Sidebar as PrimeSidebar } from 'primereact/sidebar'
import { useEffect, useState } from 'react'
import { MenuItem } from './sidebar.types'

const menuItems: MenuItem[] = [
  { label: 'Home', icon: 'pi pi-home', route: '/dashboard' },
  { label: 'Histórico', icon: 'pi pi-list', route: '/dashboard/history' },
  { label: 'Decriptar', icon: 'pi pi-key', route: '/dashboard/decrypt' },
]

export default function Sidebar() {
  const { visible, hide, toggle } = useSidebarStore()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 992)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLogout = () => {
    dispatch(clearToken())
    document.cookie = 'token=; Max-Age=0; path=/;'
    router.push('/auth/login')
  }

  const renderMenuItems = () => (
    <ul role="menu" aria-label="Menu Principal">
      {menuItems.map(({ label, icon, route }) => {
        const active = router.pathname === route
        return (
          <li key={route} role="none">
            <Link
              href={route}
              role="menuitem"
              title={`Ir Para ${label}`}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center justify-start gap-3 px-5 py-3 rounded-sm transition-colors
                focus:outline-none focus-visible:ring-2 focus-visible:ring-light-100/50
                border-b border-dark-100/10 dark:border-dark-300/20 group
                ${
                  active
                    ? '!text-primary-500 dark:!text-primary-400 font-semibold'
                    : '!text-dark-100 dark:!text-light-100'
                }`}
              onClick={isMobile ? hide : undefined}
            >
              <i
                className={`text-lg ${icon} transition-colors group-hover:!text-primary-500 dark:group-hover:!text-primary-300`}
                aria-hidden="true"
              />
              <span className="transition-colors group-hover:!text-primary-500 dark:group-hover:!text-primary-300">
                {label}
              </span>
            </Link>
          </li>
        )
      })}

      <li role="none">
        <button
          onClick={handleLogout}
          role="menuitem"
          title="Sair do Sistema"
          aria-label="Sair do Sistema"
          className="w-full flex items-center justify-start gap-3 px-5 py-3 border-b border-dark-100/10 dark:border-dark-300/20 rounded-sm
            text-red-600 hover:!text-red-500 dark:hover:!text-red-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 group"
        >
          <i
            className="pi pi-sign-out text-lg transition-colors group-hover:!text-red-500 dark:group-hover:!text-red-400"
            aria-hidden="true"
          />
          <span className="transition-colors group-hover:!text-red-500 dark:group-hover:!text-red-400">
            Sair
          </span>
        </button>
      </li>
    </ul>
  )

  const sidebarStyle =
    '!bg-light-300 dark:!bg-dark-100 !text-dark-100 dark:!text-light-100 shadow-none relative'

  if (!isMobile) {
    return (
      <aside className={`${sidebarStyle} h-full p-4`} aria-label="Menu lateral">
        <div className="absolute top-0 left-0 w-full h-0.5 shadow-[0_-2px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_4px_rgba(255,255,255,0.06)] pointer-events-none z-[-1]" />
        <div className="flex justify-center py-4">
          <Image
            src="/logo-claro.svg"
            alt="Logo da Claro"
            width={72}
            height={72}
            className="rounded-full object-contain"
            priority
          />
        </div>
        <nav className="flex flex-col py-4" role="navigation" aria-label="Navegação lateral">
          {renderMenuItems()}
        </nav>
      </aside>
    )
  }

  return (
    <>
      <button
        aria-label="Abrir menu lateral"
        aria-expanded={visible}
        aria-controls="mobile-sidebar"
        onClick={toggle}
        className="fixed top-4 left-4 z-50 p-2 rounded !bg-primary-500 text-light-100 shadow-lg md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-light-100"
      >
        <i className="pi pi-bars" aria-hidden="true" />
      </button>

      <PrimeSidebar
        id="mobile-sidebar"
        visible={visible}
        onHide={hide}
        baseZIndex={1000}
        showCloseIcon={true}
        modal={true}
        className={`${sidebarStyle} w-64`}
        aria-label="Menu lateral móvel"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 shadow-[0_-2px_4px_rgba(0,0,0,0.08)] dark:shadow-[0_-2px_4px_rgba(255,255,255,0.06)] pointer-events-none z-[-1]" />
        <div className="flex justify-center py-4">
          <Image
            src="/logo-claro.svg"
            alt="Logo da Claro"
            width={50}
            height={50}
            className="rounded-full object-contain"
            loading="lazy"
          />
        </div>
        <nav className="flex flex-col py-4" role="navigation" aria-label="Navegação lateral móvel">
          {renderMenuItems()}
        </nav>
      </PrimeSidebar>
    </>
  )
}
