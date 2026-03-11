import { fail, ok } from '@/lib/api'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { RoleCode } from '@prisma/client'

export async function POST(request: Request) {
  const body = await request.json()
  const name = String(body.name || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const password = String(body.password || '')
  const phone = String(body.phone || '').trim()
  const address = String(body.address || '').trim()

  if (!name || !email || !password) return fail('البيانات الأساسية مطلوبة', 400)

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return fail('البريد مستخدم مسبقًا', 409)

  const passwordHash = await hash(password, 10)
  const user = await prisma.user.create({
    data: { fullName: name, email, passwordHash, role: RoleCode.CLIENT },
  })
  await prisma.client.create({
    data: { userId: user.id, name, email, phone, address },
  })

  return ok({ success: true, message: 'تم إنشاء الحساب بنجاح' }, 201)
}
