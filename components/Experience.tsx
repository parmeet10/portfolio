'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Calendar } from 'lucide-react'

import { useEffect, useState } from 'react'
import { Experience as ExperienceType } from '@/lib/data'

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([])

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.experiences) {
          setExperiences(data.experiences)
        }
      })
      .catch(err => console.error('Error fetching experiences:', err))
  }, [])
  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg">My professional journey</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } items-center gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-black transform -translate-x-1/2 z-10 hidden md:block" />

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  <motion.div
                    className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 glow-effect"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-300 mb-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Briefcase size={18} />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={18} />
                            <span className="text-sm">{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} text-white text-sm font-semibold whitespace-nowrap`}>
                        {exp.period}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.description.map((item, i) => (
                        <motion.li
                          key={i}
                          className="text-gray-300 flex items-start gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                        >
                          <span className="text-blue-400 mt-1.5">▹</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

