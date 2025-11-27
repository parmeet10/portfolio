import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData, Experience } from '@/lib/data'
import { verifySession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    if (!verifySession(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newExperience: Experience = await request.json()
    const data = getPortfolioData()
    
    // Generate ID if not provided
    if (!newExperience.id) {
      newExperience.id = Date.now().toString()
    }
    
    data.experiences.push(newExperience)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true, experience: newExperience })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add experience' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!verifySession(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedExperience: Experience = await request.json()
    const data = getPortfolioData()
    
    const index = data.experiences.findIndex(exp => exp.id === updatedExperience.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 })
    }
    
    data.experiences[index] = updatedExperience
    savePortfolioData(data)
    
    return NextResponse.json({ success: true, experience: updatedExperience })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!verifySession(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const data = getPortfolioData()
    data.experiences = data.experiences.filter(exp => exp.id !== id)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}

