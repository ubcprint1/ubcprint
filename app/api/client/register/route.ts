import { hash } from 'bcryptjs'
import { RoleCode } from '@prisma/client'
import { fail, ok } from '@/lib/api'
import { prisma } from '@/lib/prisma'
import { createSession } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const fullName = String(body.fullName || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const phone = String(body.phone || '').trim()
  const password = String(body.password || '')

  if (!fullName || !email || !phone || !password) return fail('All fields are required', 400)

  const existingUser = await prisma.user.findUnique({ where: { email } })
  const existingClient = await prisma.client.findUnique({ where: { email } })
  if (existingUser || existingClient) return fail('Email already exists', 409)

  const passwordHash = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role: RoleCode.CLIENT,
    },
  })

  await prisma.client.create({
    data: {
      userId: user.id,
      name: fullName,
      email,
      phone,
    },
  })

  await createSession({ id: user.id, email: user.email, role: user.role, fullName: user.fullName })

  return ok({ success: true, redirectTo: '/client/portal' }, 201)
}
