import { NextRequest, NextResponse } from "next/server"

const protectedPrefixes = ["/dashboard", "/accounting", "/attendance", "/audit", "/inventory", "/machines", "/orders", "/reports", "/settings", "/tasks", "/employees", "/customers", "/production"]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const needsAuth = protectedPrefixes.some(prefix => path === prefix || path.startsWith(prefix + "/")) || path.startsWith("/api/")
  const publicApi = path.startsWith('/api/health') || path.startsWith('/api/auth/login') || path.startsWith('/api/auth/logout') || path.startsWith('/api/auth/me') || path.startsWith('/api/client/register') || path.startsWith('/api/public/request-quote') || path.startsWith('/api/public/track-order')

  if (needsAuth && !publicApi) {
    const token = request.cookies.get("ubcprint_session")?.value
    if (!token) {
      if (path.startsWith('/api/')) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
