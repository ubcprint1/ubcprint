import { prisma } from '@/lib/prisma'
import { ok, fail } from '@/lib/api'

export async function GET() {
  const items = await prisma.attendance.findMany({ include: { employee: { include: { user: true } } }, orderBy: { day: 'desc' } })
  return ok({ items, total: items.length })
}

export async function POST(request: Request) {
  const body = await request.json()
  if (!body.employeeId) return fail('employeeId is required')
  const item = await prisma.attendance.create({
    data: {
      employeeId: body.employeeId,
      day: body.day ? new Date(body.day) : new Date(),
      checkIn: body.checkIn ? new Date(body.checkIn) : undefined,
      checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
      status: body.status || 'PRESENT',
      notes: body.notes,
    },
  })
  return ok(item, 201)
}
