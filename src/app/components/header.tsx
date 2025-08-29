"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { List as ListIcon, ChevronDown, Users, Send, MoreVertical, X } from 'lucide-react'
import { User } from './user'

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false) // Состояние модального окна
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenu && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenu(false)
        setShowDropdown(false)
      }

      if (!mobileMenu && showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }

      // Закрытие модального окна при клике вне его
      if (showRequestModal && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowRequestModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenu, showDropdown, showRequestModal])

  const handleListChange = (type: string) => {
    setShowDropdown(false)
    setMobileMenu(false)
    if (pathname === '/') {
      router.replace(`/?type=${type}`)
    } else {
      router.push(`/?type=${type}`)
    }
  }

  // Функция для открытия ссылки и закрытия модального окна
  const handleRequestLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    setShowRequestModal(false)
    setMobileMenu(false)
  }

  return (
    <div className="bg-main-dark p-3 sm:p-4 fixed w-full z-[99999] shadow-2xl header">
      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-3 sm:gap-4">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <Link className="text-2xl sm:text-3xl flex items-center min-w-[150px]" href="/">
            <span className="text-logo-green">B</span>
            <span className="text-logo-blue">GDPS</span>
            <span className="mx-2">GlobalList</span>
          </Link>

          <div className="hidden lg:flex flex-wrap w-full sm:w-auto items-center justify-between">
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              <div
                className="relative hover:text-white hover:underline transition-colors duration-200 min-w-[120px] max-w-full"
                ref={dropdownRef}
              >
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-1 w-full bg-main-darklight py-2 px-2 rounded-lg hover:bg-main-darklight/80 transition-colors"
                >
                  <ListIcon size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
                  <span className="text-base sm:text-xl">Lists</span>
                  <ChevronDown size={18} className={`transition-transform min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-full sm:w-40 bg-main-dark rounded-md shadow-lg z-50">
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
                      <button
                        onClick={() => handleListChange('impossible')}
                        className="block w-full text-left px-4 py-2 hover:bg-main-light/50 transition-colors"
                      >
                        Impossible
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/top"
                className="flex items-center gap-1 bg-main-darklight px-2 py-2 rounded-lg hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200 min-w-[120px] max-w-full justify-center"
              >
                <Users size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
                <span className="hidden xs:inline">Players Top</span>
                <span className="xs:hidden">Top</span>
              </Link>
              <button
                onClick={() => setShowRequestModal(true)}
                className="flex items-center gap-1 bg-main-darklight py-2 px-2 rounded-lg hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200 min-w-[120px] max-w-full justify-center"
              >
                <Send size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
                <span className="hidden xs:inline">Send Request</span>
                <span className="xs:hidden">Request</span>
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center ml-4">
          <User />
        </div>

        <div className="lg:hidden flex items-center ml-auto">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="p-2 rounded-lg bg-main-darklight hover:bg-main-darklight/80 transition-colors"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
          >
            {mobileMenu ? (
              <X size={36} className="w-9 h-9" />
            ) : (
              <MoreVertical size={36} className="w-9 h-9" />
            )}
          </button>
        </div>
      </div>
      
      {mobileMenu && (
        <div
          ref={mobileMenuRef}
          className="xs:hidden absolute left-0 top-full w-full bg-main-dark shadow-lg z-50 animate-fade-in"
        >
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 w-full bg-main-darklight py-2 px-3 rounded-none hover:bg-main-darklight/80 transition-colors"
          >
            <ListIcon size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
            <span className="text-base">Lists</span>
            <ChevronDown size={18} className={`transition-transform min-w-[18px] min-h-[18px] max-w-[18px] max-h-[18px] ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          {showDropdown && (
            <div className="w-full bg-main-dark rounded-md shadow-lg z-50">
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
                <button
                  onClick={() => handleListChange('impossible')}
                  className="block w-full text-left px-4 py-2 hover:bg-main-light/50 transition-colors"
                >
                  Impossible
                </button>
              </div>
            </div>
          )}
          <Link
            href="/top"
            className="flex items-center gap-2 bg-main-darklight px-3 py-2 hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200 w-full justify-start"
            onClick={() => setMobileMenu(false)}
          >
            <Users size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
            <span>Players Top</span>
          </Link>
          <button
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 bg-main-darklight py-2 px-3 hover:bg-main-darklight/80 transition-colors text-base hover:underline duration-200 w-full justify-start"
          >
            <Send size={26} className="min-w-[26px] min-h-[26px] max-w-[26px] max-h-[26px]" />
            <span>Send Request</span>
          </button>
          
          <hr className='border-1 m-2 rounded-xl border-white/20'/>

          <div className="w-full flex justify-start items-center border-t border-main-darklight">
            <User />
          </div>
        </div>
      )}

      {showRequestModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[99999] p-4">
          <div 
            ref={modalRef}
            className="bg-main-dark rounded-lg p-6 w-full max-w-md animate-fade-in"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Send Request</h3>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="p-1 rounded-full hover:bg-main-darklight transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => handleRequestLink('https://forms.gle/BdSUr9xibZVW6aoL8')}
                className="w-full bg-main-darklight py-3 px-4 rounded-lg hover:bg-main-light/50 transition-colors text-left"
              >
                Level Progress/Verifed
              </button>
              
              <button 
                onClick={() => handleRequestLink('https://forms.gle/x2VLcKuMUqSQQZyg7')}
                className="w-full bg-main-darklight py-3 px-4 rounded-lg hover:bg-main-light/50 transition-colors text-left"
              >
                New level in list
              </button>
              
              <button 
                onClick={() => handleRequestLink('https://forms.gle/ptAULaAbiAzZj75cA')}
                className="w-full bg-main-darklight py-3 px-4 rounded-lg hover:bg-main-light/50 transition-colors text-left"
              >
                Changes to account data
              </button>

              <button 
                onClick={() => handleRequestLink('https://feedback.qual.su')}
                className="flex items-center w-full bg-main-darklight py-3 px-4 rounded-lg hover:bg-main-light/50 transition-colors text-left"
              >
                Feedback
                (<Image src="/qualsu.png" alt="Qualsu" width={100} height={10} className="inline-block"/>)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}