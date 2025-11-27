'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useState } from 'react'

interface PhoneNumberProps {
  phone: string | string[]
}

// Country code to flag emoji mapping
const getCountryFlag = (phoneNumber: string): string => {
  if (phoneNumber.startsWith('+91')) return '🇮🇳'
  if (phoneNumber.startsWith('+49')) return '🇩🇪'
  if (phoneNumber.startsWith('+1')) return '🇺🇸'
  if (phoneNumber.startsWith('+44')) return '🇬🇧'
  if (phoneNumber.startsWith('+33')) return '🇫🇷'
  if (phoneNumber.startsWith('+39')) return '🇮🇹'
  if (phoneNumber.startsWith('+34')) return '🇪🇸'
  if (phoneNumber.startsWith('+31')) return '🇳🇱'
  if (phoneNumber.startsWith('+32')) return '🇧🇪'
  if (phoneNumber.startsWith('+41')) return '🇨🇭'
  if (phoneNumber.startsWith('+43')) return '🇦🇹'
  if (phoneNumber.startsWith('+45')) return '🇩🇰'
  if (phoneNumber.startsWith('+46')) return '🇸🇪'
  if (phoneNumber.startsWith('+47')) return '🇳🇴'
  if (phoneNumber.startsWith('+358')) return '🇫🇮'
  if (phoneNumber.startsWith('+7')) return '🇷🇺'
  if (phoneNumber.startsWith('+81')) return '🇯🇵'
  if (phoneNumber.startsWith('+82')) return '🇰🇷'
  if (phoneNumber.startsWith('+86')) return '🇨🇳'
  if (phoneNumber.startsWith('+61')) return '🇦🇺'
  if (phoneNumber.startsWith('+64')) return '🇳🇿'
  if (phoneNumber.startsWith('+971')) return '🇦🇪'
  if (phoneNumber.startsWith('+966')) return '🇸🇦'
  return '📞'
}

const formatPhoneNumber = (phoneNumber: string): string => {
  // Clean up the phone number
  const cleaned = phoneNumber.trim()
  
  // Format Indian number (+91)
  if (cleaned.startsWith('+91')) {
    const number = cleaned.replace('+91', '').trim()
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
  }
  
  // Format German number (+49)
  if (cleaned.startsWith('+49')) {
    const number = cleaned.replace('+49', '').trim()
    if (number.length === 11) {
      return `+49 ${number.slice(0, 3)} ${number.slice(3, 7)} ${number.slice(7)}`
    }
    return `+49 ${number.slice(0, 4)} ${number.slice(4)}`
  }
  
  return cleaned
}

export default function PhoneNumber({ phone }: PhoneNumberProps) {
  const phoneNumbers = Array.isArray(phone) ? phone : [phone]

  if (phoneNumbers.length === 1) {
    const phoneNumber = phoneNumbers[0]
    const flag = getCountryFlag(phoneNumber)
    const formatted = formatPhoneNumber(phoneNumber)

    return (
      <motion.a
        href={`tel:${phoneNumber.replace(/\s/g, '')}`}
        className="flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-all glow-effect group"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone size={20} />
        <span className="text-2xl">{flag}</span>
        <span className="hidden sm:inline">{formatted}</span>
        <span className="sm:hidden">Call</span>
      </motion.a>
    )
  }

  // Multiple phone numbers - show in a dropdown/popover style
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 glass rounded-full hover:bg-white/10 transition-all glow-effect"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <Phone size={20} />
        <span className="hidden sm:inline">Phone</span>
        <span className="sm:hidden">Call</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 z-50"
            >
              <div className="glass rounded-xl p-2 min-w-[200px] shadow-xl">
                {phoneNumbers.map((phoneNumber, index) => {
                  const flag = getCountryFlag(phoneNumber)
                  const formatted = formatPhoneNumber(phoneNumber)
                  
                  return (
                    <motion.a
                      key={index}
                      href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all mb-1 last:mb-0 block"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <span className="text-2xl">{flag}</span>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{formatted}</div>
                        {phoneNumber.startsWith('+91') && (
                          <div className="text-gray-400 text-xs">India</div>
                        )}
                        {phoneNumber.startsWith('+49') && (
                          <div className="text-gray-400 text-xs">Germany</div>
                        )}
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

