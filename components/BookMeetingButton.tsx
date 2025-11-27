'use client'

import { useState } from 'react'

export default function BookMeetingButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href="https://calendly.com/sparmeet162000/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
            isHovered 
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 scale-110' 
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 scale-100'
          }`}
        />
        
        {/* Button */}
        <button className="relative px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-sm md:text-base shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 backdrop-blur-sm">
          <span className="flex items-center gap-2">
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span>book 1:1</span>
          </span>
        </button>
      </div>
    </a>
  )
}

