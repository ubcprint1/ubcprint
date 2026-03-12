'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireStaffAccess() {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) {
    redirect('/staff/login')
  }
}

function clean(value: FormDataEntryValue | null) {
  return String(value || '').trim()
}

export async function createClientAction(formData: FormData) {
  await requireStaffAccess()

  const name = clean(formData.get('name'))
  const companyName = clean(formData.get('companyName')) || null
  const email = clean(formData.get('email')).toLowerCase() || null
  const phone = clean(formData.get('phone')) || null
  const city = clean(formData.get('city')) || null
  const address = clean(formData.get('address')) || null
  const createPortal = formData.get('createPortal') === 'on'
  const password = clean(formData.get('password'))

  if (!name) redirect('/accounting/customer/new?error=missing')

  if (email) {
    const emailExists = await prisma.client.findUnique({ where: { email } })
    if (emailExists) redirect('/accounting/customer/new?error=email')
  }

  let userId: string | undefined
  if (createPortal) {
    if (!email || !password) redirect('/accounting/customer/new?error=portal')

    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) redirect('/accounting/customer/new?error=userexists')

    const user = await prisma.user.create({
      data: {
        fullName: companyName || name,
        email,
        passwordHash: await hash(password, 10),
        role: 'CLIENT',
        isActive: true,
      },
    })
    userId = user.id
  }

  await prisma.client.create({
    data: { name, companyName, email, phone, city, address, userId },
  })

  revalidatePath('/accounting/customers')
  redirect('/accounting/customers?success=created')
}

export async function updateClientAction(formData: FormData) {
  await requireStaffAccess()

  const id = clean(formData.get('id'))
  const name = clean(formData.get('name'))
  const companyName = clean(formData.get('companyName')) || null
  const email = clean(formData.get('email')).toLowerCase() || null
  const phone = clean(formData.get('phone')) || null
  const city = clean(formData.get('city')) || null
  const address = clean(formData.get('address')) || null
  const syncPortal = formData.get('syncPortal') === 'on'
  const password = clean(formData.get('password'))

  if (!id || !name) redirect(`/accounting/customer/${id}?error=missing`)

  if (email) {
    const emailExists = await prisma.client.findFirst({ where: { id: { not: id }, email } })
    if (emailExists) redirect(`/accounting/customer/${id}?error=email`)
  }

  const currentClient = await prisma.client.findUnique({ where: { id }, include: { user: true } })
  if (!currentClient) redirect('/accounting/customers')

  let userId = currentClient.userId || undefined

  if (syncPortal) {
    if (!email) redirect(`/accounting/customer/${id}?error=portal`)

    if (currentClient.user) {
      await prisma.user.update({
        where: { id: currentClient.user.id },
        data: {
          fullName: companyName || name,
          email,
          passwordHash: password ? await hash(password, 10) : undefined,
          isActive: true,
        },
      })
    } else {
      const existingUser = await prisma.user.findUnique({ where: { email } })
      if (existingUser) redirect(`/accounting/customer/${id}?error=userexists`)

      const user = await prisma.user.create({
        data: {
          fullName: companyName || name,
          email,
          passwordHash: await hash(password || 'Client@123456', 10),
          role: 'CLIENT',
          isActive: true,
        },
      })
      userId = user.id
    }
  }

  await prisma.client.update({
    where: { id },
    data: { name, companyName, email, phone, city, address, userId: userId || null },
  })

  revalidatePath('/accounting/customers')
  revalidatePath(`/accounting/customer/${id}`)
  redirect(`/accounting/customer/${id}?success=saved`)
}

export async function deleteClientAction(formData: FormData) {
  await requireStaffAccess()

  const id = clean(formData.get('id'))
  if (!id) redirect('/accounting/customers')

  const client = await prisma.client.findUnique({ where: { id } })
  if (!client) redirect('/accounting/customers')

  const [orders, quotes, invoices] = await Promise.all([
    prisma.order.count({ where: { clientId: id } }),
    prisma.quote.count({ where: { clientId: id } }),
    prisma.invoice.count({ where: { clientId: id } }),
  ])

  if (orders > 0 || quotes > 0 || invoices > 0) {
    redirect('/accounting/customers?error=linked')
  }

  if (client.userId) {
    await prisma.user.delete({ where: { id: client.userId } }).catch(() => null)
  }

  await prisma.client.delete({ where: { id } })
  revalidatePath('/accounting/customers')
  redirect('/accounting/customers?success=deleted')
}
