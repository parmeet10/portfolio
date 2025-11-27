import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData, PortfolioData } from '@/lib/data'
import { verifySession } from '@/lib/auth'

export async function GET() {
  try {
    const data = getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!verifySession(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const updatedData: PortfolioData = await request.json()
    savePortfolioData(updatedData)
    
    return NextResponse.json({ success: true, data: updatedData })
  } catch (error) {
    console.error('Error updating portfolio data:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    )
  }
}

