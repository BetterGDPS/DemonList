"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { List as ListIcon, ChevronDown, Users, Send } from 'lucide-react'

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
        <div className="flex items-center w-full sm:w-auto gap-2">
          <Link className="text-xl sm:text-3xl flex items-center" href="/">
            <span className="text-logo-green">B</span>
            <span className="text-logo-blue">GDPS</span>
            <span className="ml-2">GlobalList</span>
          </Link>

          <div className="relative ml-4 hover:text-white hover:underline transition-colors duration-200" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-main-darklight  py-2 rounded-lg hover:bg-main-darklight/80 transition-colors"
            >
              <ListIcon size={30} />
              <span className="text-xl">Lists</span>
              <ChevronDown size={18} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-main-dark rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={() => handleListChange('main')}
                    className="block w-full text-left px-4 py-2 hover:bg-main-light/50 transition-colors"
                  >
                    Main
                  </button>
                  <button
                    onClick={() => handleListChange('challenge')}
                    className="block w-full text-left px-4 py-2 hover:bg-main-light/50 transition-colors"
                  >
                    Challenge
                  </button>
                  <button
                    onClick={() => handleListChange('platform')}
                    className="block w-full text-left px-4 py-2 hover:bg-main-light/50 transition-colors"
                  >
                    Platform
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/top"
            className="flex items-center gap-2 bg-main-darklight px-4 py-2 rounded-lg hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200"
          >
            <Users size={22} />
            Players Top
          </Link>
          <a
            href="https://discord.gg/KCbGSn79ka"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-main-darklight py-2 rounded-lg hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200"
          >
            <Send size={22} />
            Send Request
          </a>
        </div>
      </div>
    </div>
  )
}