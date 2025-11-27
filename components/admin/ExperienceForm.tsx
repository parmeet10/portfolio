'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, Edit } from 'lucide-react'
import { Experience } from '@/lib/data'

export default function ExperienceForm() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    location: '',
    period: '',
    description: [],
    color: 'from-blue-500 to-cyan-500',
  })
  const [descriptionText, setDescriptionText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setExperiences(data.experiences || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      id: '',
      company: '',
      position: '',
      location: '',
      period: '',
      description: [],
      color: 'from-blue-500 to-cyan-500',
    })
    setDescriptionText('')
  }

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id)
    setFormData(exp)
    setDescriptionText(exp.description.join('\n'))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    try {
      const res = await fetch(`/api/portfolio/experiences?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setExperiences(experiences.filter(exp => exp.id !== id))
        setMessage('Experience deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error deleting experience.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const updatedFormData = {
      ...formData,
      description: descriptionText.split('\n').filter(line => line.trim()),
    }

    try {
      const url = editingId
        ? '/api/portfolio/experiences'
        : '/api/portfolio/experiences'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      })

      if (res.ok) {
        await fetchData()
        handleAddNew()
        setMessage(editingId ? 'Experience updated!' : 'Experience added!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save. Please try again.')
      }
    } catch (error) {
      setMessage('Error saving data.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Experiences</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Position</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Period</label>
            <input
              type="text"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Jan 2020 - Dec 2022"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Color Gradient</label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
              <option value="from-purple-500 to-pink-500">Purple to Pink</option>
              <option value="from-green-500 to-emerald-500">Green to Emerald</option>
              <option value="from-orange-500 to-red-500">Orange to Red</option>
              <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description (one per line)</label>
          <textarea
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={6}
            required
          />
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${message.includes('success') || message.includes('added') || message.includes('updated') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50"
        >
          <Save size={20} />
          {loading ? 'Saving...' : editingId ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Existing Experiences</h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="glass p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white">{exp.position}</h4>
                <p className="text-gray-300">{exp.company} • {exp.location}</p>
                <p className="text-gray-400 text-sm">{exp.period}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 glass rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

