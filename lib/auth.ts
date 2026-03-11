import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { RoleCode } from '@prisma/client'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'change-this-secret')
export const cookieName = 'ubcprint_session'

export type SessionAudience = 'client' | 'staff' | 'admin'

export function audienceForRole(role: RoleCode | string): SessionAudience {
  if (role === 'ADMIN') return 'admin'
  if (role === 'CLIENT') return 'client'
  return 'staff'
}

export async function createSession(user: { id: string; email: string; role: string; fullName: string }) {
  const token = await new SignJWT({ ...user, audience: audienceForRole(user.role) })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

  cookies().set(cookieName, token, { httpOnly: true, sameSite: 'lax', path: '/', secure: false })
  return token
}

export async function clearSession() {
  cookies().set(cookieName, '', { expires: new Date(0), path: '/' })
}

export async function getSession() {
  const token = cookies().get(cookieName)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as { id: string; email: string; role: string; fullName: string; audience: SessionAudience }
  } catch {
    return null
  }
}

export async function authenticate(email: string, password: string) {
  const normalized = email.trim().toLowerCase()
  const user = await prisma.user.findUnique({ where: { email: normalized } })
  if (!user || !user.isActive) return null
  const isValid = await compare(password, user.passwordHash)
  if (!isValid) return null
  return user
}
