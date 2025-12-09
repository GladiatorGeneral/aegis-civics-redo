'use client';

/**
 * PHNX AI - Main Navigation Component
 * Modular navbar with dropdown menus for USAMind sections
 */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MAIN_NAV, type NavItem } from '@/config/navigation';

interface NavbarProps {
  transparent?: boolean;
}

function DropdownMenu({ item, isOpen, onClose }: { item: NavItem; isOpen: boolean; onClose: () => void }) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!item.children) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden z-50"
        >
          <div className="p-2">
            {item.children.map((child) => (
              <Link
                key={child.id}
                href={child.href}
                onClick={onClose}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <span className="text-xl mt-0.5">{child.icon}</span>
                <div>
                  <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                    {child.label}
                  </p>
                  {child.description && (
                    <p className="text-white/50 text-xs mt-0.5">{child.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative">
      {hasChildren ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isActive || isDropdownOpen
              ? 'text-cyan-400 bg-cyan-500/10'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
          <svg 
            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      ) : (
        <Link
          href={item.href}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            isActive
              ? 'text-cyan-400 bg-cyan-500/10'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          {item.icon && <span>{item.icon}</span>}
          <span>{item.label}</span>
        </Link>
      )}
      
      {hasChildren && (
        <DropdownMenu 
          item={item} 
          isOpen={isDropdownOpen} 
          onClose={() => setIsDropdownOpen(false)} 
        />
      )}
    </div>
  );
}

export function Navbar({ transparent = false }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (item: NavItem) => {
    if (!pathname) return false;
    if (item.href === '/') return pathname === '/';
    if (pathname.startsWith(item.href)) return true;
    if (item.children) {
      return item.children.some(child => pathname.startsWith(child.href));
    }
    return false;
  };

  const navBackground = transparent && !isScrolled
    ? 'bg-transparent'
    : 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-purple-600 flex items-center justify-center shadow-lg shadow-orange-500/30"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <span className="text-xl">🔥</span>
              </motion.div>
              <div>
                <span className="text-xl font-bold text-white">
                  Phnx<span className="text-orange-400"> AI</span>
                </span>
                <p className="text-[10px] text-white/40 -mt-1">Civic Intelligence Platform</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {MAIN_NAV.filter(item => item.id !== 'login').map((item) => (
                <NavLink key={item.id} item={item} isActive={isActive(item)} />
              ))}
            </div>

            {/* Login Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-slate-950/95 backdrop-blur-xl lg:hidden overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {MAIN_NAV.map((item) => (
                <div key={item.id}>
                  {item.children ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 px-4 py-3 text-white font-medium">
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <span>{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive(item)
                          ? 'text-cyan-400 bg-cyan-500/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
