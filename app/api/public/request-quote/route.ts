import { fail, ok } from '@/lib/api'
import { prisma } from '@/lib/prisma'

function nextOrderNumber() {
  return `ORD-${Date.now().toString().slice(-6)}`
}

export async function POST(request: Request) {
  const body = await request.json()
  const customerName = String(body.customerName || body.name || '').trim()
  const productName = String(body.productName || body.projectType || 'مشروع طباعة').trim()
  const quantity = Number(body.quantity || 1)
  const description = String(body.description || '').trim()
  const email = String(body.email || '').trim().toLowerCase()

  if (!customerName) return fail('اسم العميل مطلوب', 400)

  let clientId: string | undefined
  if (email) {
    const client = await prisma.client.findUnique({ where: { email } })
    clientId = client?.id
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: nextOrderNumber(),
      customerName,
      productName,
      quantity,
      description,
      clientId,
      status: 'PRICING',
    },
  })

  return ok({ success: true, orderNumber: order.orderNumber, id: order.id }, 201)
}
