'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2 } from 'lucide-react'
import { PersonalInfo } from '@/lib/data'

export default function PersonalInfoForm() {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: '',
    title: '',
    description: '',
    email: '',
    phone: '',
    github: '',
    linkedin: '',
  })
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/portfolio')
      const data = await res.json()
      setFormData(data.personalInfo)
      
      // Handle phone numbers (can be string or array)
      if (data.personalInfo.phone) {
        if (Array.isArray(data.personalInfo.phone)) {
          setPhoneNumbers(data.personalInfo.phone.length > 0 ? data.personalInfo.phone : [''])
        } else {
          setPhoneNumbers([data.personalInfo.phone])
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handlePhoneChange = (index: number, value: string) => {
    const updated = [...phoneNumbers]
    updated[index] = value
    setPhoneNumbers(updated)
  }

  const addPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ''])
  }

  const removePhoneNumber = (index: number) => {
    if (phoneNumbers.length > 1) {
      setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const data = await fetch('/api/portfolio').then(r => r.json())
      
      // Prepare phone data (single string if one number, array if multiple)
      const phoneData = phoneNumbers.filter(p => p.trim()).length === 1
        ? phoneNumbers.filter(p => p.trim())[0]
        : phoneNumbers.filter(p => p.trim())

      data.personalInfo = {
        ...formData,
        phone: phoneData,
      }

      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setMessage('Personal info updated successfully!')
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
      <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">Phone Numbers</label>
          <div className="space-y-2">
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  placeholder="+91 1234567890 or +49 1234567890"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={index === 0}
                />
                {phoneNumbers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhoneNumber(index)}
                    className="px-4 py-2 glass rounded-lg hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPhoneNumber}
              className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all text-sm"
            >
              <Plus size={16} />
              <span>Add Another Phone Number</span>
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            💡 Tip: Include country code (e.g., +91 for India, +49 for Germany)
          </p>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">GitHub URL</label>
          <input
            type="url"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">LinkedIn URL</label>
          <input
            type="url"
            value={formData.linkedin}
            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
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

