import { clearSession } from '@/lib/auth'
import { ok } from '@/lib/api'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  await clearSession()

  const contentType = request.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return ok({ success: true })
  }

  let redirectTo = '/'
  try {
    const formData = await request.formData()
    const requested = String(formData.get('redirectTo') || '').trim()
    if (requested.startsWith('/')) redirectTo = requested
  } catch {}

  return NextResponse.redirect(new URL(redirectTo, request.url), { status: 303 })
}
