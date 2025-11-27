'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Award, Calendar } from 'lucide-react'

import { useEffect, useState } from 'react'
import { Education as EducationType } from '@/lib/data'

export default function Education() {
  const [education, setEducation] = useState<EducationType[]>([])

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.education) {
          setEducation(data.education)
        }
      })
      .catch(err => console.error('Error fetching education:', err))
  }, [])
  return (
    <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <p className="text-gray-400 text-lg">My academic journey</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <motion.div
                className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 glow-effect h-full"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${edu.color} flex items-center justify-center mb-6`}>
                  {index === 0 ? (
                    <GraduationCap size={32} className="text-white" />
                  ) : (
                    <Award size={32} className="text-white" />
                  )}
                </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{edu.institution}</h3>
                  <p className="text-gray-300 mb-4">{edu.degree}</p>

                  <div className="flex items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${edu.color} text-white font-semibold`}>
                    {edu.achievement}
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  )
}

