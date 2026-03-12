'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function toNumber(value: FormDataEntryValue | null) {
  const num = Number(value || 0)
  return Number.isFinite(num) ? num : 0
}

async function requireAdmin() {
  const session = await getSession()
  if (!session || session.audience !== 'admin') {
    redirect('/admin/login')
  }
}

export async function createProductAction(formData: FormData) {
  await requireAdmin()

  const name = String(formData.get('name') || '').trim()
  const sku = String(formData.get('sku') || '').trim().toUpperCase()
  const category = String(formData.get('category') || '').trim()
  const unitPrice = toNumber(formData.get('unitPrice'))
  const isActive = formData.get('isActive') === 'on'

  if (!name || !sku || !category) {
    redirect('/admin/products/new?error=missing')
  }

  const exists = await prisma.product.findFirst({ where: { OR: [{ sku }, { name }] } })
  if (exists) {
    redirect('/admin/products/new?error=exists')
  }

  await prisma.product.create({
    data: { name, sku, category, unitPrice, isActive },
  })

  revalidatePath('/admin/products')
  redirect('/admin/products?success=created')
}

export async function updateProductAction(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  const name = String(formData.get('name') || '').trim()
  const sku = String(formData.get('sku') || '').trim().toUpperCase()
  const category = String(formData.get('category') || '').trim()
  const unitPrice = toNumber(formData.get('unitPrice'))
  const isActive = formData.get('isActive') === 'on'

  if (!id || !name || !sku || !category) {
    redirect(`/admin/products/${id}?error=missing`)
  }

  const exists = await prisma.product.findFirst({
    where: {
      id: { not: id },
      OR: [{ sku }, { name }],
    },
  })

  if (exists) {
    redirect(`/admin/products/${id}?error=exists`)
  }

  await prisma.product.update({
    where: { id },
    data: { name, sku, category, unitPrice, isActive },
  })

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  redirect(`/admin/products/${id}?success=saved`)
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()

  const id = String(formData.get('id') || '')
  if (!id) redirect('/admin/products')

  const linkedItems = await prisma.orderItem.count({ where: { productId: id } })
  const linkedQuotes = await prisma.quoteItem.count({ where: { productId: id } })

  if (linkedItems > 0 || linkedQuotes > 0) {
    await prisma.product.update({ where: { id }, data: { isActive: false } })
    revalidatePath('/admin/products')
    redirect('/admin/products?success=archived')
  }

  await prisma.product.delete({ where: { id } })
  revalidatePath('/admin/products')
  redirect('/admin/products?success=deleted')
}
