import { ok, fail } from '@/lib/api'
import { prisma } from '@/lib/prisma'

function publicStage(status: string) {
  const map: Record<string, string> = {
    NEW: 'قيد المراجعة',
    REVIEW: 'قيد المراجعة',
    PRICING: 'قيد التسعير',
    APPROVAL: 'بانتظار الموافقة',
    DESIGN: 'قيد التصميم',
    PRODUCTION: 'قيد الطباعة',
    QUALITY: 'قيد المراجعة النهائية',
    PACKAGING: 'قيد التجهيز',
    DELIVERY: 'جاهز للتسليم',
    COMPLETED: 'تم التسليم',
    CANCELLED: 'ملغي',
  }
  return map[status] || status
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = String(searchParams.get('query') || '').trim()

  if (!query) return fail('query is required', 400)

  const order = await prisma.order.findFirst({
    where: {
      OR: [
        { orderNumber: query },
        { client: { phone: query } },
      ],
    },
    include: { client: true, invoices: true },
    orderBy: { createdAt: 'desc' },
  })

  if (!order) return fail('Order not found', 404)

  return ok({
    order: {
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      productName: order.productName,
      quantity: order.quantity,
      status: order.status,
      publicStatus: publicStage(order.status),
      deliveryMethod: order.deliveryMethod,
      expectedDelivery: order.expectedDelivery,
      createdAt: order.createdAt,
      paidAmount: order.paidAmount,
      totalCost: order.totalCost,
    },
  })
}
