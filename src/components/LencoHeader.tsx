import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

export default function LencoHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/lenco-logo.svg"
              alt="Lenco"
              className="h-7"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium">
                Products
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium">
                Business
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Pricing
            </a>
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium">
                Support
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <a href="#login" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Log in
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#get-started"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Get Started in Minutes
            </a>
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-900">
              <span className="text-sm">EN</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <nav className="flex flex-col gap-4 px-4">
            <a href="#products" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Products
            </a>
            <a href="#business" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Business
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Pricing
            </a>
            <a href="#support" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Support
            </a>
            <a href="#login" className="text-gray-600 hover:text-gray-900 font-medium py-2">
              Log in
            </a>
            <a
              href="#get-started"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-center"
            >
              Get Started in Minutes
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
