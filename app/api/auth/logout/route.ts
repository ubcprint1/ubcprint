import { NextResponse } from 'next/server'
import { clearSession } from '@/lib/auth'

export async function POST(request: Request) {
  await clearSession()

  const contentType = request.headers.get('content-type') || ''
  let redirectTo = '/'

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    redirectTo = String(formData.get('redirectTo') || '/').trim() || '/'
    return NextResponse.redirect(new URL(redirectTo, request.url))
  }

  try {
    const body = await request.json()
    redirectTo = String(body?.redirectTo || '/').trim() || '/'
  } catch {
    redirectTo = '/'
  }

  return NextResponse.json({ success: true, redirectTo })
}
