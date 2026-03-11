import { prisma } from "@/lib/prisma"
import { InvoiceStatus, OrderStatus } from "@prisma/client"

export async function getDashboardData() {
  const [ordersCount, clientsCount, productsCount, machinesCount, invoicesCount, activeTasksCount, attendanceTodayCount, revenueAgg, paidAgg, pendingOrders, recentOrders] = await Promise.all([
    prisma.order.count(),
    prisma.client.count(),
    prisma.product.count(),
    prisma.machine.count(),
    prisma.invoice.count(),
    prisma.task.count({ where: { status: { in: ["TODO", "IN_PROGRESS"] } } }),
    prisma.attendance.count(),
    prisma.invoice.aggregate({ _sum: { total: true } }),
    prisma.invoice.aggregate({ _sum: { paidAmount: true } }),
    prisma.order.count({ where: { status: { in: [OrderStatus.NEW, OrderStatus.REVIEW, OrderStatus.PRICING, OrderStatus.PRODUCTION] } } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderNumber: true,
        customerName: true,
        status: true,
        totalCost: true,
        createdAt: true,
      },
    }),
  ])

  const revenue = revenueAgg._sum.total ?? 0
  const paid = paidAgg._sum.paidAmount ?? 0

  const invoicesByStatus = await prisma.invoice.groupBy({
    by: ["status"],
    _count: { _all: true },
  })

  const paidInvoices = invoicesByStatus.find((i) => i.status === InvoiceStatus.PAID)?._count._all ?? 0

  return {
    stats: {
      ordersCount,
      clientsCount,
      productsCount,
      machinesCount,
      invoicesCount,
      activeTasksCount,
      attendanceTodayCount,
      pendingOrders,
      revenue,
      paid,
      outstanding: Math.max(revenue - paid, 0),
      paidInvoices,
    },
    recentOrders,
  }
}
