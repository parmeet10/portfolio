'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { Skills } from '@/lib/data'

export default function SkillsForm() {
  const [skills, setSkills] = useState<Skills>({
    languages: { title: 'Languages', skills: [], color: 'from-blue-500 to-cyan-500' },
    technologies: { title: 'Technologies', skills: [], color: 'from-purple-500 to-pink-500' },
    webDevTools: { title: 'Web Dev Tools', skills: [], color: 'from-green-500 to-emerald-500' },
    frameworks: { title: 'Frameworks', skills: [], color: 'from-orange-500 to-red-500' },
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setSkills(data.skills || skills)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills }),
      })

      if (res.ok) {
        setMessage('Skills updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to update. Please try again.')
      }
    } catch (error) {
      setMessage('Error updating data.')
    } finally {
      setLoading(false)
    }
  }

  const updateSkills = (category: keyof Skills, skillsText: string) => {
    setSkills({
      ...skills,
      [category]: {
        ...skills[category],
        skills: skillsText.split(',').map(s => s.trim()).filter(s => s),
      },
    })
  }

  const updateColor = (category: keyof Skills, color: string) => {
    setSkills({
      ...skills,
      [category]: {
        ...skills[category],
        color,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>

      {Object.entries(skills).map(([key, category]) => (
        <div key={key} className="glass p-6 rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-300 mb-2 font-semibold">{category.title}</label>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2 text-sm">Color Gradient</label>
              <select
                value={category.color}
                onChange={(e) => updateColor(key as keyof Skills, e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                <option value="from-orange-500 to-red-500">Orange to Red</option>
                <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
              </select>
            </div>
            <label className="block text-gray-400 mb-2 text-sm">Skills (comma-separated)</label>
            <textarea
              value={category.skills.join(', ')}
              onChange={(e) => updateSkills(key as keyof Skills, e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="e.g., JavaScript, TypeScript, React"
            />
          </div>
        </div>
      ))}

      {message && (
        <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
      >
        <Save size={20} />
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}

