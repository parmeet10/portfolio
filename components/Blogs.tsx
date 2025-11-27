'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Calendar, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

interface BlogPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  content?: string
  guid?: string
  categories?: string[]
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (data.blogs) {
          setBlogs(data.blogs)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching blogs:', err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    } catch {
      return dateString
    }
  }

  const cleanText = (text: string) => {
    // Additional safety check to remove any remaining HTML
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim()
  }

  return (
    <section id="blogs" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text">Blogs</span>
          </h2>
          <p className="text-gray-400 text-lg">My latest articles and thoughts</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No blogs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.guid || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <motion.a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block glass rounded-2xl p-6 sm:p-8 h-full flex flex-col hover:bg-white/10 transition-all duration-300 glow-effect"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                      <BookOpen size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar size={14} />
                        <span>{formatDate(blog.pubDate)}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {cleanText(blog.contentSnippet)}
                  </p>

                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.categories.slice(0, 3).map((category, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-blue-400 font-semibold mt-auto">
                    <span>Read More</span>
                    <ExternalLink size={18} />
                  </div>
                </motion.a>
              </motion.div>
            ))}
          </div>
        )}

        {blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://medium.com/@sparmeet162000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 glass rounded-full hover:bg-white/10 transition-all glow-effect"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <BookOpen size={20} />
              <span className="text-lg">View All on Medium</span>
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

