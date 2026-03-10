import { PrismaClient, RoleCode, OrderStatus, QuoteStatus, InvoiceStatus, MachineStatus, TaskPriority, TaskStatus, AttendanceStatus } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash("Admin@123456", 10)

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      fullName: "مدير النظام",
      email: "admin@example.com",
      passwordHash,
      role: RoleCode.ADMIN,
    },
  })

  const salesUser = await prisma.user.upsert({
    where: { email: "sales@example.com" },
    update: {},
    create: {
      fullName: "موظف المبيعات",
      email: "sales@example.com",
      passwordHash,
      role: RoleCode.SALES,
    },
  })

  const operatorUser = await prisma.user.upsert({
    where: { email: "operator@example.com" },
    update: {},
    create: {
      fullName: "مشغل ماكينة",
      email: "operator@example.com",
      passwordHash,
      role: RoleCode.OPERATOR,
    },
  })

  const employeeSales = await prisma.employee.upsert({
    where: { userId: salesUser.id },
    update: {},
    create: {
      userId: salesUser.id,
      employeeNo: "EMP-001",
      department: "Sales",
      title: "Sales Executive",
      phone: "0500000001",
    },
  })

  const employeeOperator = await prisma.employee.upsert({
    where: { userId: operatorUser.id },
    update: {},
    create: {
      userId: operatorUser.id,
      employeeNo: "EMP-002",
      department: "Production",
      title: "Operator",
      phone: "0500000002",
    },
  })

  const client = await prisma.client.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      name: "شركة النور للدعاية",
      companyName: "شركة النور للدعاية",
      email: "client@example.com",
      phone: "0500000003",
      city: "جدة",
      address: "حي السلامة",
    },
  })

  const product1 = await prisma.product.upsert({
    where: { sku: "PR-001" },
    update: {},
    create: { sku: "PR-001", name: "بطاقات أعمال", category: "ID Printing", unitPrice: 2 },
  })
  const product2 = await prisma.product.upsert({
    where: { sku: "PR-002" },
    update: {},
    create: { sku: "PR-002", name: "بروشور دعائي", category: "Digital Printing", unitPrice: 10 },
  })

  const order = await prisma.order.upsert({
    where: { orderNumber: "ORD-1001" },
    update: {},
    create: {
      orderNumber: "ORD-1001",
      customerName: client.name,
      productName: product2.name,
      quantity: 500,
      description: "طباعة بروشورات تعريفية",
      priority: "high",
      status: OrderStatus.PRODUCTION,
      totalCost: 5000,
      paidAmount: 2500,
      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      clientId: client.id,
      items: {
        create: [
          { productId: product2.id, productName: product2.name, quantity: 500, unitPrice: 10, totalPrice: 5000 },
        ],
      },
    },
  })

  await prisma.quote.upsert({
    where: { quoteNumber: "QUO-1001" },
    update: {},
    create: {
      quoteNumber: "QUO-1001",
      status: QuoteStatus.APPROVED,
      subtotal: 5000,
      tax: 750,
      total: 5750,
      orderId: order.id,
      clientId: client.id,
      items: {
        create: [
          { productId: product2.id, productName: product2.name, quantity: 500, unitPrice: 10, totalPrice: 5000 },
        ],
      },
    },
  })

  await prisma.invoice.upsert({
    where: { invoiceNumber: "INV-1001" },
    update: {},
    create: {
      invoiceNumber: "INV-1001",
      status: InvoiceStatus.PARTIAL,
      subtotal: 5000,
      tax: 750,
      total: 5750,
      paidAmount: 2500,
      balanceAmount: 3250,
      orderId: order.id,
      clientId: client.id,
      payments: {
        create: [
          { amount: 2500, method: "bank_transfer", referenceNo: "TRX-1001" },
        ],
      },
    },
  })

  const machine = await prisma.machine.upsert({
    where: { code: "MC-001" },
    update: {},
    create: {
      code: "MC-001",
      name: "Digital Printer",
      model: "Konica Minolta",
      category: "Digital Printing",
      status: MachineStatus.WORKING,
      location: "Workshop A",
    },
  })

  await prisma.productionJob.create({
    data: {
      orderId: order.id,
      machineId: machine.id,
      operatorId: employeeOperator.id,
      stage: "running",
      quantityTarget: 500,
      quantityDone: 320,
      startedAt: new Date(),
    },
  }).catch(() => {})

  await prisma.task.createMany({
    data: [
      {
        title: "متابعة موافقة العميل",
        description: "التأكد من اعتماد تصميم البروشور",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.HIGH,
        employeeId: employeeSales.id,
        relatedType: "order",
        relatedId: order.id,
      },
      {
        title: "تشغيل الطلب على ماكينة الطباعة",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.URGENT,
        employeeId: employeeOperator.id,
        relatedType: "production",
        relatedId: order.id,
      },
    ],
  })

  await prisma.attendance.create({
    data: {
      employeeId: employeeOperator.id,
      day: new Date(),
      checkIn: new Date(),
      status: AttendanceStatus.PRESENT,
    },
  }).catch(() => {})

  await prisma.activityLog.create({
    data: {
      userId: admin.id,
      module: "seed",
      action: "initialize",
      targetId: order.id,
      payload: { message: "Database seeded successfully" },
    },
  })
}

main().finally(async () => prisma.$disconnect())
