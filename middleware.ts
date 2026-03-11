import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "change-this-secret")
const protectedPrefixes = ["/dashboard", "/accounting", "/attendance", "/audit", "/inventory", "/machines", "/orders", "/reports", "/settings", "/tasks", "/employees", "/customers", "/production", "/staff", "/admin"]
const publicApiPrefixes = [
  '/api/health',
  '/api/auth/login',
  '/api/auth/logout',
  '/api/auth/me',
  '/api/client/register',
  '/api/public/request-quote',
  '/api/public/track-order',
]

async function readSessionToken(token?: string) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { role?: string; audience?: string }
  } catch {
    return null
  }
}

function isProtectedPath(path: string) {
  return protectedPrefixes.some(prefix => path === prefix || path.startsWith(prefix + "/")) || path.startsWith("/api/")
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicApi = publicApiPrefixes.some(prefix => path.startsWith(prefix))
  const token = request.cookies.get("ubcprint_session")?.value
  const session = await readSessionToken(token)

  if (path === '/login') {
    return NextResponse.redirect(new URL('/staff/login', request.url))
  }

  if (path.startsWith('/client/portal')) {
    if (!session) return NextResponse.redirect(new URL('/client/login', request.url))
    if (session.audience !== 'client') return NextResponse.redirect(new URL('/', request.url))
  }

  if (path.startsWith('/staff')) {
    if (path === '/staff/login') {
      if (session?.audience === 'staff') return NextResponse.redirect(new URL('/staff/dashboard', request.url))
      return NextResponse.next()
    }
    if (!session) return NextResponse.redirect(new URL('/staff/login', request.url))
    if (session.audience !== 'staff') return NextResponse.redirect(new URL('/', request.url))
  }

  if (path.startsWith('/admin')) {
    if (path === '/admin/login') {
      if (session?.audience === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      return NextResponse.next()
    }
    if (!session) return NextResponse.redirect(new URL('/admin/login', request.url))
    if (session.audience !== 'admin') return NextResponse.redirect(new URL('/', request.url))
  }

  const isLegacyInternal = ["/dashboard", "/accounting", "/attendance", "/audit", "/inventory", "/machines", "/orders", "/reports", "/settings", "/tasks", "/employees", "/customers", "/production"].some(prefix => path === prefix || path.startsWith(prefix + "/"))
  if (isLegacyInternal) {
    if (!session) return NextResponse.redirect(new URL('/staff/login', request.url))
    if (session.audience === 'client') return NextResponse.redirect(new URL('/', request.url))
  }

  if (isProtectedPath(path) && !isPublicApi) {
    if (!session) {
      if (path.startsWith('/api/')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL('/staff/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
