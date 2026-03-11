import { fail, ok } from '@/lib/api'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const orderNumber = String(body.orderNumber || '').trim()
  if (!orderNumber) return fail('رقم الطلب مطلوب', 400)

  const order = await prisma.order.findUnique({ where: { orderNumber } })
  if (!order) return fail('الطلب غير موجود', 404)

  return ok({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    status: order.status,
    expectedDelivery: order.expectedDelivery,
    totalCost: order.totalCost,
    paidAmount: order.paidAmount,
  })
}
