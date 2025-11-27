'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

export default function InterestsForm() {
  const [interests, setInterests] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setInterests(data.interests || '')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const data = await fetch('/api/portfolio').then(r => r.json())
      data.interests = interests

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Interests updated successfully!')
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Interests</h2>
      
      <div>
        <label className="block text-gray-300 mb-2">Interests Description</label>
        <textarea
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Describe your interests..."
          required
        />
      </div>

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

