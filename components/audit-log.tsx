'use client'

import { useState } from 'react'
import { History, Filter, Download, Eye, Edit, Trash2, Plus, UserCheck } from 'lucide-react'
import { downloadCSV } from '@/lib/download-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { AuditLog } from '@/lib/audit-types'

const MOCK_LOGS: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-11-10 14:35:22',
    userId: 'u1',
    userName: 'أحمد محمد',
    action: 'إضافة مهمة',
    module: 'tasks',
    details: 'تم إضافة مهمة جديدة: طباعة 1000 كتيب',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    timestamp: '2024-11-10 13:20:15',
    userId: 'u2',
    userName: 'فاطمة علي',
    action: 'تعديل حالة آلة',
    module: 'machines',
    details: 'تم تغيير حالة آلة الطباعة الرقمية من "تعمل" إلى "صيانة"',
    changes: [
      { field: 'الحالة', oldValue: 'تعمل', newValue: 'صيانة' },
    ],
    ipAddress: '192.168.1.101',
  },
  {
    id: '3',
    timestamp: '2024-11-10 12:05:40',
    userId: 'u1',
    userName: 'أحمد محمد',
    action: 'إضافة فاتورة',
    module: 'accounting',
    details: 'تم إنشاء فاتورة جديدة INV-2024-005 بمبلغ 12,500 ر.س',
    ipAddress: '192.168.1.100',
  },
  {
    id: '4',
    timestamp: '2024-11-10 11:30:00',
    userId: 'u3',
    userName: 'محمد حسن',
    action: 'تسجيل دخول',
    module: 'attendance',
    details: 'تسجيل حضور الموظف في الشيفت الصباحي',
    ipAddress: '192.168.1.102',
  },
  {
    id: '5',
    timestamp: '2024-11-10 10:15:30',
    userId: 'u1',
    userName: 'أحمد محمد',
    action: 'تعديل صلاحيات',
    module: 'users',
    details: 'تم تعديل صلاحيات المستخدم سارة أحمد من "موظف" إلى "مشرف"',
    changes: [
      { field: 'الدور', oldValue: 'موظف', newValue: 'مشرف' },
    ],
    ipAddress: '192.168.1.100',
  },
  {
    id: '6',
    timestamp: '2024-11-10 09:45:12',
    userId: 'u2',
    userName: 'فاطمة علي',
    action: 'جدولة صيانة',
    module: 'maintenance',
    details: 'تم جدولة صيانة دورية لآلة التقطيع في 2024-11-15',
    ipAddress: '192.168.1.101',
  },
  {
    id: '7',
    timestamp: '2024-11-10 08:30:00',
    userId: 'u1',
    userName: 'أحمد محمد',
    action: 'حذف مهمة',
    module: 'tasks',
    details: 'تم حذف مهمة "طباعة بروشورات تجريبية"',
    ipAddress: '192.168.1.100',
  },
]

const actionIcons: Record<string, any> = {
  'إضافة مهمة': Plus,
  'إضافة فاتورة': Plus,
  'تعديل حالة آلة': Edit,
  'تعديل صلاحيات': Edit,
  'تسجيل دخول': UserCheck,
  'جدولة صيانة': Edit,
  'حذف مهمة': Trash2,
  'عرض': Eye,
}

const moduleColors = {
  tasks: 'bg-blue-500/10 text-blue-500',
  machines: 'bg-amber-500/10 text-amber-500',
  attendance: 'bg-purple-500/10 text-purple-500',
  accounting: 'bg-emerald-500/10 text-emerald-500',
  users: 'bg-red-500/10 text-red-500',
  maintenance: 'bg-slate-500/10 text-slate-500',
}

const moduleLabels = {
  tasks: 'المهام',
  machines: 'الآلات',
  attendance: 'الحضور',
  accounting: 'المحاسبة',
  users: 'المستخدمين',
  maintenance: 'الصيانة',
}

export function AuditLog() {
  const [logs] = useState<AuditLog[]>(MOCK_LOGS)
  const [filterModule, setFilterModule] = useState<string>('all')

  const filteredLogs =
    filterModule === 'all'
      ? logs
      : logs.filter((log) => log.module === filterModule)

  const exportAuditLog = () => {
    const mlabels: Record<string, string> = { tasks: 'المهام', machines: 'الآلات', attendance: 'الحضور', accounting: 'المحاسبة', users: 'المستخدمين', maintenance: 'الصيانة' }
    const headers = ['#', 'التاريخ والوقت', 'المستخدم', 'الإجراء', 'القسم', 'التفاصيل']
    const rows = filteredLogs.map((log, i) => [
      String(i + 1),
      log.timestamp,
      log.userName,
      log.action,
      mlabels[log.module] || log.module,
      log.details,
    ])
    downloadCSV(`سجل-العمليات-${filterModule === 'all' ? 'الكل' : filterModule}`, headers, rows)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>سجل العمليات</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-1 text-sm"
            >
              <option value="all">جميع الأقسام</option>
              <option value="tasks">المهام</option>
              <option value="machines">الآلات</option>
              <option value="attendance">الحضور</option>
              <option value="accounting">المحاسبة</option>
              <option value="users">المستخدمين</option>
              <option value="maintenance">الصيانة</option>
            </select>
            <Button variant="outline" size="sm" className="gap-2" onClick={exportAuditLog}>
              <Download className="h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredLogs.map((log) => {
            const Icon = actionIcons[log.action] || Eye
            return (
              <div
                key={log.id}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-accent p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{log.action}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          moduleColors[log.module]
                        }`}
                      >
                        {moduleLabels[log.module]}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.details}</p>
                    {log.changes && log.changes.length > 0 && (
                      <div className="space-y-1 rounded-lg bg-accent p-2 text-xs">
                        {log.changes.map((change, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              {change.field}:
                            </span>
                            <span className="text-red-500 line-through">
                              {change.oldValue}
                            </span>
                            <span className="text-muted-foreground">←</span>
                            <span className="text-emerald-500">
                              {change.newValue}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{log.userName}</span>
                      <span>•</span>
                      <span>{log.timestamp}</span>
                      {log.ipAddress && (
                        <>
                          <span>•</span>
                          <span>{log.ipAddress}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
