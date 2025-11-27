import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData, Project } from '@/lib/data'
import { verifySession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    if (!verifySession(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const newProject: Project = await request.json()
    const data = getPortfolioData()
    
    if (!newProject.id) {
      newProject.id = Date.now().toString()
    }
    
    data.projects.push(newProject)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add project' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!verifySession(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedProject: Project = await request.json()
    const data = getPortfolioData()
    
    const index = data.projects.findIndex(proj => proj.id === updatedProject.id)
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    data.projects[index] = updatedProject
    savePortfolioData(data)
    
    return NextResponse.json({ success: true, project: updatedProject })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project' },
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
    data.projects = data.projects.filter(proj => proj.id !== id)
    savePortfolioData(data)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

