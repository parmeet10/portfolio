import { NextRequest } from 'next/server'
import crypto from 'crypto'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123' // Change this in production!

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export function createSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

export function verifySession(request: NextRequest): boolean {
  const sessionToken = request.cookies.get('admin_session')?.value
  // In a real app, you'd verify this against a database or cache
  // For simplicity, we'll check if it exists and is valid format
  return !!sessionToken && sessionToken.length === 64
}

