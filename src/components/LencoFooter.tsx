import { Link } from '@tanstack/react-router'
import { BarChart3, MapPin, Mail } from 'lucide-react'

export default function LencoFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-10 pb-12">
          {/* Logo and Report Button */}
          <div className="col-span-2 sm:col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img
                src="/lenco-logo.svg"
                alt="Lenco"
                className="h-6"
              />
            </Link>
            <a
              href="#report"
              className="inline-flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md text-xs text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all whitespace-nowrap"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>View Report & Status</span>
            </a>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#about" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Products</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#current-account" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Business Current Account
                </a>
              </li>
              <li>
                <a href="#expense" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Expense Management
                </a>
              </li>
              <li>
                <a href="#payouts" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Payouts
                </a>
              </li>
              <li>
                <a href="#bill-payment" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Bill Payment
                </a>
              </li>
              <li>
                <a href="#invoicing" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Invoicing
                </a>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Business</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#api" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#setup" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Setup
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-medium text-gray-900 mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#blog" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#locations" className="text-gray-500 hover:text-gray-900 text-sm transition-colors inline-flex items-center gap-1">
                  Locations
                  <MapPin className="w-3 h-3 text-blue-500" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@lenco.co"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3 text-blue-500" />
                  support@lenco.co
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Legal Text */}
        <div className="pt-8 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 leading-relaxed max-w-none">
            Lenco Technologies Limited is a technology company providing financial management services for businesses in Nigeria 
            (Lenco). Lenco is not a bank. The banking services that may be accessed through Lenco are provided by Providus Bank, 
            a CBN-licensed commercial bank, and include: issuance and management of Bank Accounts, fund transfers, and related 
            financial services. Lenco is a registered trademark of Lenco Technologies Limited, a company incorporated under the 
            laws of the Federal Republic of Nigeria with registration number 1789766. Our registered address is: 14 Fagba Road, 
            Ogba, Lagos. © Lenco Technologies Limited 2025.
          </p>
        </div>
      </div>
    </footer>
  )
}
