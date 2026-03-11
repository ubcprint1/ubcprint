import { DeliveryMethod, OrderStatus } from '@prisma/client'
import { fail, ok } from '@/lib/api'
import { prisma } from '@/lib/prisma'

const deliveryMap: Record<string, DeliveryMethod> = {
  SHIPPING: 'SHIPPING',
  PICKUP: 'PICKUP',
}

function generateOrderNumber() {
  return `ORD-${Date.now().toString().slice(-8)}`
}

export async function POST(request: Request) {
  const body = await request.json()

  const customerName = String(body.customerName || '').trim()
  const phone = String(body.phone || '').trim()
  const email = String(body.email || '').trim().toLowerCase()
  const description = String(body.description || '').trim()
  const quantity = Number(body.quantity || 1)
  const productName = String(body.productName || 'مشروع طباعة مخصص').trim()
  const deliveryMethod = deliveryMap[String(body.deliveryMethod || 'SHIPPING')] || 'SHIPPING'
  const paymentMethod = String(body.paymentMethod || 'cash')
  const machine = String(body.machine || '')
  const shippingAddress = String(body.shippingAddress || '').trim()
  const designHelp = Boolean(body.designHelp)

  if (!customerName || !phone || !description) return fail('Name, phone and project description are required', 400)

  let client = null
  if (email) {
    client = await prisma.client.findUnique({ where: { email } })
    if (!client) {
      client = await prisma.client.create({
        data: {
          name: customerName,
          email,
          phone,
          address: shippingAddress || undefined,
        },
      })
    }
  }

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      customerName,
      productName,
      quantity,
      description: JSON.stringify({
        projectDescription: description,
        paymentMethod,
        machine,
        shippingAddress,
        designHelp,
      }),
      deliveryMethod,
      status: OrderStatus.NEW,
      clientId: client?.id,
      items: {
        create: [
          {
            productName,
            quantity,
            totalPrice: 0,
            unitPrice: 0,
            notes: description,
          },
        ],
      },
    },
    include: { items: true },
  })

  return ok({
    success: true,
    orderNumber: order.orderNumber,
    orderId: order.id,
    message: 'Request submitted successfully',
  }, 201)
}
