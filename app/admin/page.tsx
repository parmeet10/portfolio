'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, LogOut, Save, Plus, Trash2, Edit } from 'lucide-react'
import PersonalInfoForm from '@/components/admin/PersonalInfoForm'
import ExperienceForm from '@/components/admin/ExperienceForm'
import ProjectForm from '@/components/admin/ProjectForm'
import SkillsForm from '@/components/admin/SkillsForm'
import EducationForm from '@/components/admin/EducationForm'
import InterestsForm from '@/components/admin/InterestsForm'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('personal')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
    } catch (error) {
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        setIsAuthenticated(true)
        setPassword('')
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 max-w-md w-full"
        >
          <div className="flex items-center justify-center mb-6">
            <Lock size={48} className="text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-6 gradient-text">
            Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'interests', label: 'Interests' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'glass text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-6 sm:p-8">
          {activeTab === 'personal' && <PersonalInfoForm />}
          {activeTab === 'experience' && <ExperienceForm />}
          {activeTab === 'projects' && <ProjectForm />}
          {activeTab === 'skills' && <SkillsForm />}
          {activeTab === 'education' && <EducationForm />}
          {activeTab === 'interests' && <InterestsForm />}
        </div>
      </div>
    </div>
  )
}

