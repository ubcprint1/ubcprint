import { fail, ok } from '@/lib/api'
import { authenticate, createSession, audienceForRole, type SessionAudience } from '@/lib/auth'

const audienceRedirect: Record<SessionAudience, string> = {
  client: '/client/portal',
  staff: '/staff/dashboard',
  admin: '/admin/dashboard',
}

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const requestedAudience = String(body.audience || '').trim().toLowerCase() as SessionAudience | ''

  if (!email || !password) return fail('Email and password are required', 400)

  const user = await authenticate(email, password)
  if (!user) return fail('Invalid credentials', 401)

  const actualAudience = audienceForRole(user.role)

  if (requestedAudience && requestedAudience !== actualAudience) {
    return fail('هذا الحساب غير مخصص لهذا المسار', 403)
  }

  await createSession({ id: user.id, email: user.email, role: user.role, fullName: user.fullName })

  return ok({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      audience: actualAudience,
    },
    redirectTo: audienceRedirect[actualAudience],
  })
}
