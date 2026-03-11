import { ok, fail } from '@/lib/api'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session?.email) return fail('Unauthorized', 401)

  const user = await prisma.user.findUnique({
    where: { email: String(session.email) },
    include: { client: true, employee: true },
  })

  if (!user) return fail('User not found', 404)

  return ok({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      client: user.client,
      employee: user.employee,
    },
  })
}
