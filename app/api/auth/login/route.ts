import { fail, ok } from '@/lib/api'
import { authenticate, createSession } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')

  if (!email || !password) return fail('Email and password are required', 400)

  const user = await authenticate(email, password)
  if (!user) return fail('Invalid credentials', 401)

  await createSession({ id: user.id, email: user.email, role: user.role, fullName: user.fullName })

  return ok({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    redirectTo: user.role === 'CLIENT' ? '/client/portal' : '/dashboard',
  })
}
