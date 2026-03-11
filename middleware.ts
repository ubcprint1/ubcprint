import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-this-secret')

const staffProtected = ['/staff', '/dashboard', '/orders', '/accounting', '/attendance', '/audit', '/inventory', '/machines', '/reports', '/settings', '/tasks', '/employees', '/customers', '/production']
const adminProtected = ['/admin']
const clientProtected = ['/client/portal']
const authApi = ['/api/auth/login', '/api/auth/logout', '/api/auth/me', '/api/client/register', '/api/public/request-quote', '/api/public/track-order']

function startsWithAny(path: string, prefixes: string[]) {
  return prefixes.some((prefix) => path === prefix || path.startsWith(prefix + '/'))
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  if (path.startsWith('/_next') || path === '/favicon.ico') return NextResponse.next()
  if (authApi.some((p) => path === p || path.startsWith(p + '/'))) return NextResponse.next()

  const token = request.cookies.get('ubcprint_session')?.value
  let session: any = null

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret)
      session = payload
    } catch {
      session = null
    }
  }

  if (startsWithAny(path, clientProtected)) {
    if (!session) return NextResponse.redirect(new URL(`/client/login?redirect=${encodeURIComponent(path)}`, request.url))
    if (session.audience !== 'client') return NextResponse.redirect(new URL('/', request.url))
  }

  if (startsWithAny(path, staffProtected)) {
    if (!session) return NextResponse.redirect(new URL(`/staff/login?redirect=${encodeURIComponent(path)}`, request.url))
    if (session.audience !== 'staff' && session.audience !== 'admin') return NextResponse.redirect(new URL('/', request.url))
  }

  if (startsWithAny(path, adminProtected) && !path.startsWith('/admin/login')) {
    if (!session) return NextResponse.redirect(new URL(`/admin/login?redirect=${encodeURIComponent(path)}`, request.url))
    if (session.audience !== 'admin') return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
