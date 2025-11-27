import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

export interface BlogPost {
  title: string
  link: string
  pubDate: string
  contentSnippet: string
  content?: string
  guid?: string
  categories?: string[]
}

interface CacheData {
  blogs: BlogPost[]
  timestamp: number
}

// In-memory cache (in production, consider using Redis or a database)
let blogCache: CacheData | null = null

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['media:content', 'media'],
    ],
  },
})

// Function to strip HTML tags and decode HTML entities
function stripHtml(html: string | undefined): string {
  if (!html) return ''
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '')
  
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
  
  // Clean up multiple spaces and newlines
  text = text.replace(/\s+/g, ' ').trim()
  
  return text
}

// Function to get clean content snippet
function getContentSnippet(item: any): string {
  // Try contentSnippet first (usually cleaner)
  if (item.contentSnippet && !item.contentSnippet.includes('<')) {
    return item.contentSnippet.substring(0, 200)
  }
  
  // Try content and strip HTML
  if (item.content) {
    const cleanContent = stripHtml(item.content)
    return cleanContent.substring(0, 200)
  }
  
  // Fallback to description
  if (item.description) {
    const cleanDescription = stripHtml(item.description)
    return cleanDescription.substring(0, 200)
  }
  
  return ''
}

async function fetchBlogsFromMedium(): Promise<BlogPost[]> {
  const mediumRssUrl = 'https://medium.com/feed/@sparmeet162000'
  const feed = await parser.parseURL(mediumRssUrl)

  return feed.items
    .slice(0, 6) // Limit to 6 most recent posts
    .map((item) => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: getContentSnippet(item),
      content: item.content,
      guid: item.guid,
      categories: item.categories,
    }))
}

function isCacheValid(cache: CacheData | null): boolean {
  if (!cache) return false
  const now = Date.now()
  const age = now - cache.timestamp
  return age < CACHE_DURATION
}

export async function GET() {
  try {
    // Check if cache is valid
    if (isCacheValid(blogCache)) {
      console.log('Returning cached blogs')
      const response = NextResponse.json({ 
        blogs: blogCache!.blogs,
        cached: true,
        cacheAge: Math.floor((Date.now() - blogCache!.timestamp) / (60 * 60 * 1000)) // hours
      })
      response.headers.set('Access-Control-Allow-Origin', '*')
      response.headers.set('Access-Control-Allow-Methods', 'GET')
      response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
      return response
    }

    // Cache expired or doesn't exist, fetch fresh data
    console.log('Fetching fresh blogs from Medium')
    const blogs = await fetchBlogsFromMedium()
    
    // Update cache
    blogCache = {
      blogs,
      timestamp: Date.now(),
    }

    const response = NextResponse.json({ 
      blogs,
      cached: false 
    })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET')
    response.headers.set('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200')
    return response
  } catch (error) {
    console.error('Error fetching Medium RSS:', error)
    
    // If we have cached data, return it even if expired
    if (blogCache && blogCache.blogs.length > 0) {
      console.log('Error occurred, returning stale cache')
      const response = NextResponse.json({ 
        blogs: blogCache.blogs,
        cached: true,
        stale: true 
      })
      response.headers.set('Access-Control-Allow-Origin', '*')
      return response
    }
    
    const errorResponse = NextResponse.json(
      { error: 'Failed to fetch blogs', blogs: [] },
      { status: 500 }
    )
    errorResponse.headers.set('Access-Control-Allow-Origin', '*')
    return errorResponse
  }
}

