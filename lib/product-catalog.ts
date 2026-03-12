import { prisma } from '@/lib/prisma'

export const productGroups = [
  { value: 'custom', label: 'المنتجات المخصصة', href: '/products' },
  { value: 'apparel', label: 'الملابس', href: '/products/apparel' },
  { value: 'promo', label: 'المنتجات الترويجية', href: '/products/promo' },
  { value: 'events', label: 'المجموعات والفعاليات', href: '/products/events' },
] as const

export type ProductGroupValue = (typeof productGroups)[number]['value']

export function getProductGroupLabel(value: string) {
  return productGroups.find((group) => group.value === value)?.label || value
}

export async function getActiveProducts(group?: string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      ...(group ? { category: group } : {}),
    },
    orderBy: { createdAt: 'desc' },
  })
}
