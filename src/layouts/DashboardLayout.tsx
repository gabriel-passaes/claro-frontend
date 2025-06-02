import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'
import { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 992)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setSidebarOpen(!isMobile)
  }, [isMobile])

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex min-h-screen transition-colors duration-300 bg-light-300 text-dark-100 dark:bg-dark-300 dark:text-light-100">
      {!isMobile && (
        <aside
          className={`transition-all duration-500 ease-in-out transform ${
            sidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
          } overflow-hidden shadow-lg z-20 bg-primary-100 dark:bg-primary-900`}
        >
          <Sidebar />
        </aside>
      )}

      <div className="flex flex-col flex-1 min-h-screen">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-grow p-5">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
