'use client'

import { motion } from 'framer-motion'
import { Code, Database, Cloud, Layers } from 'lucide-react'
import InterestsSection from './InterestsSection'

import { useEffect, useState } from 'react'
import { Skills as SkillsType } from '@/lib/data'

const iconMap: Record<string, typeof Code> = {
  Languages: Code,
  Technologies: Database,
  'Web Dev Tools': Cloud,
  Frameworks: Layers,
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillsType>({
    languages: { title: 'Languages', skills: [], color: 'from-blue-500 to-cyan-500' },
    technologies: { title: 'Technologies', skills: [], color: 'from-purple-500 to-pink-500' },
    webDevTools: { title: 'Web Dev Tools', skills: [], color: 'from-green-500 to-emerald-500' },
    frameworks: { title: 'Frameworks', skills: [], color: 'from-orange-500 to-red-500' },
  })

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.skills) {
          setSkills(data.skills)
        }
      })
      .catch(err => console.error('Error fetching skills:', err))
  }, [])

  const skillCategories = [
    skills.languages,
    skills.technologies,
    skills.webDevTools,
    skills.frameworks,
  ]
  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-gray-400 text-lg">Technologies I work with</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = iconMap[category.title] || Code
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className="glass rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300 glow-effect"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.05,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-20 border border-white/10 text-white font-medium text-sm hover:bg-opacity-30 transition-all cursor-default`}>
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <InterestsSection />
      </div>
    </section>
  )
}

