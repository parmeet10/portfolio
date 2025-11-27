'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Edit } from 'lucide-react'
import { Project } from '@/lib/data'

export default function ProjectForm() {
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    type: '',
    description: '',
    features: [],
    technologies: [],
    link: '',
    color: 'from-yellow-500 to-orange-500',
  })
  const [featuresText, setFeaturesText] = useState('')
  const [technologiesText, setTechnologiesText] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleAddNew = () => {
    setEditingId(null)
    setFormData({
      id: '',
      title: '',
      type: '',
      description: '',
      features: [],
      technologies: [],
      link: '',
      color: 'from-yellow-500 to-orange-500',
    })
    setFeaturesText('')
    setTechnologiesText('')
  }

  const handleEdit = (project: Project) => {
    setEditingId(project.id)
    setFormData(project)
    setFeaturesText(project.features.join('\n'))
    setTechnologiesText(project.technologies.join(', '))
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const res = await fetch(`/api/portfolio/projects?id=${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setProjects(projects.filter(proj => proj.id !== id))
        setMessage('Project deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Error deleting project.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const updatedFormData = {
      ...formData,
      features: featuresText.split('\n').filter(line => line.trim()),
      technologies: technologiesText.split(',').map(t => t.trim()).filter(t => t),
    }

    try {
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch('/api/portfolio/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFormData),
      })

      if (res.ok) {
        await fetchData()
        handleAddNew()
        setMessage(editingId ? 'Project updated!' : 'Project added!')
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
        <h2 className="text-2xl font-bold text-white">Projects</h2>
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
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., NPM Package, Web App"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Features (one per line)</label>
            <textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Technologies (comma-separated)</label>
            <input
              type="text"
              value={technologiesText}
              onChange={(e) => setTechnologiesText(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., React, Node.js, MongoDB"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Link</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
              <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
              <option value="from-purple-500 to-pink-500">Purple to Pink</option>
              <option value="from-green-500 to-emerald-500">Green to Emerald</option>
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
          {loading ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
        </button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Existing Projects</h3>
        {projects.map((project) => (
          <div key={project.id} className="glass p-4 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white">{project.title}</h4>
                <p className="text-gray-300">{project.type}</p>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="p-2 glass rounded-lg hover:bg-white/10 transition-all"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
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

