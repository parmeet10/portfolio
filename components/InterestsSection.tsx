'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function InterestsSection() {
  const [interests, setInterests] = useState('Passionate about building scalable systems, exploring new technologies, and solving complex problems')

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.interests) {
          setInterests(data.interests)
        }
      })
      .catch(err => console.error('Error fetching interests:', err))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 text-center"
    >
      <div className="glass rounded-2xl p-8 inline-block">
        <h3 className="text-2xl font-bold text-white mb-4">Interests</h3>
        <p className="text-gray-400">{interests}</p>
      </div>
    </motion.div>
  )
}

