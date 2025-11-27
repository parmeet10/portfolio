import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const isAuthenticated = verifySession(request)
  return NextResponse.json({ authenticated: isAuthenticated })
}

