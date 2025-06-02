'use client'

import { useThemeStore } from '@/stores/theme.store'
import { Button } from 'primereact/button'
import { useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const finalTheme = saved || (prefersDark ? 'dark' : 'light')
    setTheme(finalTheme)
  }, [setTheme])

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme) 
  }

  return (
    <Button
      icon={theme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}
      onClick={handleToggle}
      className="p-button-text p-0 m-0 border-none shadow-none"
      style={{ width: '36px', height: '36px', fontSize: '1.5rem' }}
      aria-label="Alternar Tema"
    />
  )
}
