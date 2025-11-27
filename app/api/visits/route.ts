import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const visitCountFilePath = path.join(process.cwd(), 'data', 'visit-count.json')

interface VisitCount {
  count: number
  lastUpdated: string
}

function getVisitCount(): VisitCount {
  try {
    if (fs.existsSync(visitCountFilePath)) {
      const fileContents = fs.readFileSync(visitCountFilePath, 'utf8')
      return JSON.parse(fileContents)
    } else {
      // Initialize if file doesn't exist
      const initialData: VisitCount = {
        count: 0,
        lastUpdated: new Date().toISOString()
      }
      fs.writeFileSync(visitCountFilePath, JSON.stringify(initialData, null, 2), 'utf8')
      return initialData
    }
  } catch (error) {
    console.error('Error reading visit count:', error)
    // Return default if error
    return {
      count: 0,
      lastUpdated: new Date().toISOString()
    }
  }
}

function incrementVisitCount(): VisitCount {
  try {
    const current = getVisitCount()
    const updated: VisitCount = {
      count: current.count + 1,
      lastUpdated: new Date().toISOString()
    }
    
    // Ensure directory exists
    const dir = path.dirname(visitCountFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(visitCountFilePath, JSON.stringify(updated, null, 2), 'utf8')
    return updated
  } catch (error) {
    console.error('Error incrementing visit count:', error)
    throw new Error('Failed to increment visit count')
  }
}

export async function GET() {
  try {
    const data = getVisitCount()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching visit count:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visit count' },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const updated = incrementVisitCount()
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error incrementing visit count:', error)
    return NextResponse.json(
      { error: 'Failed to increment visit count' },
      { status: 500 }
    )
  }
}

