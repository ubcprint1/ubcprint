import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { productGroups } from '@/lib/product-catalog'

export async function POST(request: Request) {
  const session = await getSession()
  if (!session || session.audience !== 'admin') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 })
  }

  const body = await request.json()
  const name = String(body.name || '').trim()
  const sku = String(body.sku || '').trim().toUpperCase()
  const category = String(body.category || '').trim()
  const description = String(body.description || '').trim()
  const imageUrl = String(body.imageUrl || '').trim()
  const unitPrice = Number(body.unitPrice || 0)
  const isActive = body.isActive !== false

  if (!name || !sku || !category || Number.isNaN(unitPrice)) {
    return NextResponse.json({ error: 'البيانات الأساسية مطلوبة' }, { status: 400 })
  }

  if (!productGroups.some((group) => group.value === category)) {
    return NextResponse.json({ error: 'مجموعة المنتج غير صحيحة' }, { status: 400 })
  }

  const exists = await prisma.product.findUnique({ where: { sku } })
  if (exists) {
    return NextResponse.json({ error: 'هذا الـ SKU مستخدم مسبقًا' }, { status: 409 })
  }

  const product = await prisma.product.create({
    data: {
      name,
      sku,
      category,
      description: description || null,
      imageUrl: imageUrl || null,
      unitPrice,
      isActive,
    },
  })

  return NextResponse.json({ success: true, product })
}
