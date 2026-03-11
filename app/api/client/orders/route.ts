import { ok, fail } from '@/lib/api'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session?.email) return fail('Unauthorized', 401)

  const user = await prisma.user.findUnique({ where: { email: String(session.email) }, include: { client: true } })
  if (!user?.client) return fail('Client account not found', 404)

  const orders = await prisma.order.findMany({
    where: { clientId: user.client.id },
    include: { invoices: true },
    orderBy: { createdAt: 'desc' },
  })

  return ok({ orders })
}
