'use client'

import { useState } from 'react'
import { Shield, UserPlus, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { EMPLOYEES_FULL } from '@/lib/employees-full-data'
import { ROLE_LABELS } from '@/lib/employee-profile-types'

const roleColors = {
  admin: 'bg-red-500/10 text-red-500 border-red-500/20',
  manager: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  employee: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  viewer: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
}

const statusColors = {
  active: 'bg-emerald-500/10 text-emerald-500',
  archived: 'bg-slate-500/10 text-slate-500',
}

export function UsersManagement() {
  const [employees] = useState(EMPLOYEES_FULL)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>إدارة الموظفين</CardTitle>
          </div>
          <Link href="/users/new">
            <Button size="sm" className="gap-2">
              <UserPlus className="h-4 w-4" />
              إضافة موظف جديد
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {employees.map((employee) => (
            <Link
              key={employee.id}
              href={`/employee/${employee.id}`}
              className="block"
            >
              <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:bg-accent hover:shadow-md">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{employee.name}</h4>
                      <Badge
                        variant={employee.status === 'active' ? 'default' : 'secondary'}
                        className={statusColors[employee.status]}
                      >
                        {employee.status === 'active' ? 'نشط' : 'أرشيف'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{employee.position}</span>
                      <span>•</span>
                      <span>{employee.department}</span>
                      <span>•</span>
                      <span>رقم: {employee.employeeNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${
                      roleColors[employee.role]
                    }`}
                  >
                    {ROLE_LABELS[employee.role]}
                  </div>

                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
