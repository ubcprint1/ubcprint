'use client'

import { Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROLE_PERMISSIONS, ROLE_LABELS } from '@/lib/types'
import type { Role } from '@/lib/types'

const resources = [
  { key: 'tasks', label: 'المهام' },
  { key: 'machines', label: 'الآلات' },
  { key: 'attendance', label: 'الحضور' },
  { key: 'accounting', label: 'المحاسبة' },
  { key: 'users', label: 'المستخدمين' },
] as const

const actions = [
  { key: 'view', label: 'عرض' },
  { key: 'create', label: 'إضافة' },
  { key: 'edit', label: 'تعديل' },
  { key: 'delete', label: 'حذف' },
] as const

export function PermissionsMatrix() {
  const roles: Role[] = ['admin', 'manager', 'employee', 'viewer']

  const hasPermission = (role: Role, resource: string, action: string) => {
    const permissions = ROLE_PERMISSIONS[role]
    const resourcePermission = permissions.find((p) => p.resource === resource)
    return resourcePermission?.actions.includes(action as any) || false
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>مصفوفة الصلاحيات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-3 text-right text-sm font-semibold">الصلاحية</th>
                <th className="p-3 text-right text-sm font-semibold">الإجراء</th>
                {roles.map((role) => (
                  <th
                    key={role}
                    className="p-3 text-center text-sm font-semibold"
                  >
                    {ROLE_LABELS[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) =>
                actions.map((action, actionIndex) => (
                  <tr
                    key={`${resource.key}-${action.key}`}
                    className="border-b border-border last:border-0"
                  >
                    {actionIndex === 0 && (
                      <td
                        rowSpan={actions.length}
                        className="border-l border-border p-3 text-sm font-medium"
                      >
                        {resource.label}
                      </td>
                    )}
                    <td className="p-3 text-sm text-muted-foreground">
                      {action.label}
                    </td>
                    {roles.map((role) => (
                      <td key={role} className="p-3 text-center">
                        {hasPermission(role, resource.key, action.key) ? (
                          <div className="inline-flex items-center justify-center rounded-full bg-emerald-500/10 p-1">
                            <Check className="h-4 w-4 text-emerald-500" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center rounded-full bg-slate-500/10 p-1">
                            <X className="h-4 w-4 text-slate-500" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
