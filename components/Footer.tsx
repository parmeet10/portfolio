'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [personalInfo, setPersonalInfo] = useState({
    email: '',
    phone: '',
    github: '',
    linkedin: '',
  })

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.personalInfo) {
          setPersonalInfo(data.personalInfo)
        }
      })
      .catch(err => console.error('Error fetching personal info:', err))
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold gradient-text mb-2">Parmeet Singh</h3>
            <p className="text-gray-400">Software Development Engineer</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <motion.a
              href="mailto:sparmeet162000@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all glow-effect"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={20} />
            </motion.a>

            {personalInfo.phone && (
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <a
                  href={`tel:${Array.isArray(personalInfo.phone) ? personalInfo.phone[0] : personalInfo.phone}`.replace(/\s/g, '')}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all glow-effect"
                >
                  <Phone size={20} />
                </a>
                {Array.isArray(personalInfo.phone) && personalInfo.phone.length > 1 && (
                  <div className="absolute top-full left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="glass rounded-xl p-2 min-w-[180px] shadow-xl">
                      {personalInfo.phone.map((phone, index) => {
                        const flag = phone.startsWith('+91') ? '🇮🇳' : phone.startsWith('+49') ? '🇩🇪' : '📞'
                        return (
                          <a
                            key={index}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-sm"
                          >
                            <span>{flag}</span>
                            <span className="text-white">{phone}</span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <motion.a
              href="https://github.com/parmeet10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all glow-effect"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={20} />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/parmeet10"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all glow-effect"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={20} />
            </motion.a>
          </motion.div>

          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-all glow-effect"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400"
        >
          <p>© {new Date().getFullYear()} Parmeet Singh. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with Next.js, Tailwind CSS & Framer Motion</p>
        </motion.div>
      </div>
    </footer>
  )
}

