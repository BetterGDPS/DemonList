"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleListChange = (type: string) => {
    setShowDropdown(false)
    if (pathname === '/') {
      router.replace(`/?type=${type}`)
    } else {
      router.push(`/?type=${type}`)
    }
  }

  return (
    <div className="bg-main-dark p-4 fixed w-full z-[99999] shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link className="text-xl sm:text-3xl flex items-center mx-auto sm:mx-0" href="/">
          <span className="text-logo-green">B</span>
          <span className="text-logo-blue">GDPS</span>
          <span className="text-logo-red ml-2">DemonList</span>
          <Image 
            src="/icon.png" 
            alt="Logo" 
            width={200} 
            height={200} 
            className="ml-2 w-8 h-8 sm:w-12 sm:h-12" 
          />
        </Link>

        <div className="relative w-full sm:w-auto" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="bg-main-darklight px-4 py-2 rounded-lg hover:bg-main-darklight/80 transition-colors w-full sm:w-auto"
          >
            Select List
          </button>
          
          {showDropdown && (
            <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-48 bg-main-dark rounded-md shadow-lg z-50">
              <div className="py-1">
                <button
                  onClick={() => handleListChange('main')}
                  className="block w-full text-left px-4 py-2 hover:bg-main-darklight transition-colors"
                >
                  Main List
                </button>
                <button
                  onClick={() => handleListChange('unlisted')}
                  className="block w-full text-left px-4 py-2 hover:bg-main-darklight transition-colors"
                >
                  Unlisted Levels
                </button>
                <span
                  className="block w-full text-left px-4 py-2 transition-colors text-white/50 hover:cursor-default"
                >
                  Platformer List
                </span>
                <span
                  className="block w-full text-left px-4 py-2 transition-colors text-white/50 hover:cursor-default"
                >
                  Challenge List
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}