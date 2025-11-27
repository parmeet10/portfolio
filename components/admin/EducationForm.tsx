'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Edit } from 'lucide-react'
import { Education } from '@/lib/data'

export default function EducationForm() {
  const [educations, setEducations] = useState<Education[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Education>({
    id: '',
    institution: '',
    degree: '',
    period: '',
    achievement: '',
    color: 'from-blue-500 to-purple-500',
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
      setEducations(data.education || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      id: '',
      institution: '',
      degree: '',
      period: '',
      achievement: '',
      color: 'from-blue-500 to-purple-500',
    })
  }

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id)
    setFormData(edu)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return

    try {
      const data = await fetch('/api/portfolio').then(r => r.json())
      data.education = data.education.filter((e: Education) => e.id !== id)
      
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchData()
        setMessage('Education deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error deleting education.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const data = await fetch('/api/portfolio').then(r => r.json())
      
      if (editingId) {
        const index = data.education.findIndex((e: Education) => e.id === editingId)
        if (index !== -1) {
          data.education[index] = formData
        }
      } else {
        formData.id = Date.now().toString()
        data.education.push(formData)
      }

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        await fetchData()
        handleAddNew()
        setMessage(editingId ? 'Education updated!' : 'Education added!')
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
        <h2 className="text-2xl font-bold text-white">Education</h2>
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
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Institution</label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Degree</label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
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
              placeholder="e.g., 2018-22"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Achievement</label>
            <input
              type="text"
              value={formData.achievement}
              onChange={(e) => setFormData({ ...formData, achievement: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CGPA: 87"
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
              <option value="from-blue-500 to-purple-500">Blue to Purple</option>
              <option value="from-purple-500 to-pink-500">Purple to Pink</option>
              <option value="from-green-500 to-emerald-500">Green to Emerald</option>
              <option value="from-orange-500 to-red-500">Orange to Red</option>
            </select>
          </div>
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
          {loading ? 'Saving...' : editingId ? 'Update Education' : 'Add Education'}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Existing Education</h3>
        {educations.map((edu) => (
          <div key={edu.id} className="glass p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white">{edu.institution}</h4>
                <p className="text-gray-300">{edu.degree}</p>
                <p className="text-gray-400 text-sm">{edu.period} • {edu.achievement}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
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

