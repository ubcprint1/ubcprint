'use server'

import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { hash } from 'bcryptjs'
import { RoleCode } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const allowedRoles = new Set<RoleCode>([
  'ADMIN',
  'SUPERVISOR',
  'SALES',
  'DESIGNER',
  'ACCOUNTANT',
  'OPERATOR',
])

async function requireStaffManager() {
  const session = await getSession()
  if (!session || (session.audience !== 'admin' && session.audience !== 'staff')) {
    redirect('/staff/login')
  }
}

function clean(value: FormDataEntryValue | null) {
  return String(value || '').trim()
}

function normalizeRole(value: string): RoleCode {
  const role = value.toUpperCase() as RoleCode
  return allowedRoles.has(role) ? role : 'SALES'
}

export async function createUserAction(formData: FormData) {
  await requireStaffManager()

  const fullName = clean(formData.get('fullName'))
  const email = clean(formData.get('email')).toLowerCase()
  const password = clean(formData.get('password'))
  const role = normalizeRole(clean(formData.get('role')))
  const employeeNo = clean(formData.get('employeeNo'))
  const department = clean(formData.get('department'))
  const title = clean(formData.get('title'))
  const phone = clean(formData.get('phone')) || null
  const isActive = formData.get('isActive') === 'on'

  if (!fullName || !email || !password || !employeeNo || !department || !title) {
    redirect('/users/new?error=missing')
  }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) redirect('/users/new?error=email')

  const employeeExists = await prisma.employee.findUnique({ where: { employeeNo } })
  if (employeeExists) redirect('/users/new?error=employeeNo')

  const passwordHash = await hash(password, 10)

  await prisma.user.create({
    data: {
      fullName,
      email,
      passwordHash,
      role,
      isActive,
      employee: {
        create: {
          employeeNo,
          department,
          title,
          phone,
        },
      },
    },
  })

  revalidatePath('/users')
  redirect('/users?success=created')
}

export async function updateUserAction(formData: FormData) {
  await requireStaffManager()

  const id = clean(formData.get('id'))
  const employeeId = clean(formData.get('employeeId'))
  const fullName = clean(formData.get('fullName'))
  const email = clean(formData.get('email')).toLowerCase()
  const password = clean(formData.get('password'))
  const role = normalizeRole(clean(formData.get('role')))
  const employeeNo = clean(formData.get('employeeNo'))
  const department = clean(formData.get('department'))
  const title = clean(formData.get('title'))
  const phone = clean(formData.get('phone')) || null
  const isActive = formData.get('isActive') === 'on'

  if (!id || !employeeId || !fullName || !email || !employeeNo || !department || !title) {
    redirect(`/users/${id}?error=missing`)
  }

  const emailExists = await prisma.user.findFirst({ where: { id: { not: id }, email } })
  if (emailExists) redirect(`/users/${id}?error=email`)

  const employeeExists = await prisma.employee.findFirst({ where: { id: { not: employeeId }, employeeNo } })
  if (employeeExists) redirect(`/users/${id}?error=employeeNo`)

  await prisma.user.update({
    where: { id },
    data: {
      fullName,
      email,
      role,
      isActive,
      passwordHash: password ? await hash(password, 10) : undefined,
    },
  })

  await prisma.employee.update({
    where: { id: employeeId },
    data: { employeeNo, department, title, phone },
  })

  revalidatePath('/users')
  revalidatePath(`/users/${id}`)
  redirect(`/users/${id}?success=saved`)
}

export async function toggleUserAction(formData: FormData) {
  await requireStaffManager()
  const id = clean(formData.get('id'))
  const isActive = clean(formData.get('isActive')) === 'true'
  if (!id) redirect('/users')

  await prisma.user.update({ where: { id }, data: { isActive: !isActive } })
  revalidatePath('/users')
  redirect('/users?success=toggled')
}

export async function deleteUserAction(formData: FormData) {
  await requireStaffManager()
  const id = clean(formData.get('id'))
  const employeeId = clean(formData.get('employeeId'))
  if (!id || !employeeId) redirect('/users')

  const activities = await prisma.activityLog.count({ where: { userId: id } })
  const jobs = await prisma.productionJob.count({ where: { operatorId: employeeId } })
  const tasks = await prisma.task.count({ where: { employeeId } })
  const attendance = await prisma.attendance.count({ where: { employeeId } })

  if (activities > 0 || jobs > 0 || tasks > 0 || attendance > 0) {
    await prisma.user.update({ where: { id }, data: { isActive: false } })
    revalidatePath('/users')
    redirect('/users?success=deactivated')
  }

  await prisma.employee.delete({ where: { id: employeeId } })
  await prisma.user.delete({ where: { id } })
  revalidatePath('/users')
  redirect('/users?success=deleted')
}
