'use client'

import { useState } from 'react'
import { Employee, Task } from '@/lib/mindmap-types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Clock, Check, X, Pause } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface RadialMindmapProps {
  employees: Employee[]
  currentUserId?: string
}

export function RadialMindmap({ employees, currentUserId }: RadialMindmapProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [actionDialog, setActionDialog] = useState<'postpone' | 'cancel' | null>(null)
  const [reason, setReason] = useState('')
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null)

  const handleComplete = (task: Task) => {
    console.log('[v0] إنجاز المهمة:', task.id)
    // هنا يمكن إضافة API call لتحديث حالة المهمة
    alert(`تم إنجاز المهمة: ${task.title}`)
  }

  const handlePostpone = () => {
    if (!selectedTask || !reason.trim()) return
    console.log('[v0] تأجيل المهمة:', selectedTask.id, 'السبب:', reason)
    // هنا يمكن إضافة API call لتحديث حالة المهمة
    alert(`تم تأجيل المهمة: ${selectedTask.title}\nالسبب: ${reason}`)
    setActionDialog(null)
    setReason('')
    setSelectedTask(null)
  }

  const handleCancel = () => {
    if (!selectedTask || !reason.trim()) return
    console.log('[v0] إلغاء المهمة:', selectedTask.id, 'السبب:', reason)
    // هنا يمكن إضافة API call لتحديث حالة المهمة
    alert(`تم إلغاء المهمة: ${selectedTask.title}\nالسبب: ${reason}`)
    setActionDialog(null)
    setReason('')
    setSelectedTask(null)
  }

  const handleEmployeeClick = (employee: Employee) => {
    if (clickTimeout) {
      // ضغط مزدوج - الانتقال لصفحة منفصلة
      clearTimeout(clickTimeout)
      setClickTimeout(null)
      window.location.href = `/employee/${employee.id}`
    } else {
      // ضغط واحد - عرض التفاصيل في نفس الصفحة
      const timeout = setTimeout(() => {
        setSelectedEmployee(employee)
        setClickTimeout(null)
      }, 250)
      setClickTimeout(timeout)
    }
  }

  const handleTaskDoubleClick = (task: Task) => {
    window.location.href = `/task/${task.id}`
  }

  const getTimeRemaining = (deadline: string) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diff = deadlineDate.getTime() - now.getTime()
    
    if (diff < 0) return { text: 'متأخر', color: 'text-red-500' }
    
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)
    
    if (days > 0) return { text: `${days} يوم`, color: 'text-emerald-500' }
    if (hours > 0) return { text: `${hours} ساعة`, color: 'text-amber-500' }
    return { text: 'أقل من ساعة', color: 'text-red-500' }
  }

  return (
    <>
      <div className="flex gap-6">
        <div className={`relative flex overflow-hidden rounded-lg border border-border bg-card transition-all ${selectedEmployee ? 'w-1/2' : 'w-full'}`} style={{ height: '800px' }}>
          <div className="relative h-full w-full">
            <svg className="absolute inset-0 h-full w-full">
              {/* Draw lines from center to employees */}
              {employees.filter(emp => emp.role !== 'admin').map((employee, index) => {
                const angle = (index * 360) / (employees.length - 1) - 90
                const radius = 250
                const x = 50 + Math.cos((angle * Math.PI) / 180) * (radius / 8)
                const y = 50 + Math.sin((angle * Math.PI) / 180) * (radius / 8)
                
                return (
                  <line
                    key={employee.id}
                    x1="50%"
                    y1="50%"
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={employee.color}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.3"
                  />
                )
              })}
            </svg>

            {/* Center Admin Node */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div
                className="flex h-32 w-32 items-center justify-center rounded-full border-4 bg-card shadow-xl"
                style={{ borderColor: employees[0].color }}
              >
                <span className="text-xl font-bold">{employees[0].name}</span>
              </div>
            </div>

            {/* Employee Nodes */}
            {employees.filter(emp => emp.role !== 'admin').map((employee, index) => {
              const angle = (index * 360) / (employees.length - 1) - 90
              const radius = 250
              const x = 50 + Math.cos((angle * Math.PI) / 180) * (radius / 8)
              const y = 50 + Math.sin((angle * Math.PI) / 180) * (radius / 8)
              
              const isSelected = selectedEmployee?.id === employee.id
              
              return (
                <div
                  key={employee.id}
                  className="absolute z-10"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-4 bg-card shadow-lg transition-all hover:scale-110 hover:shadow-xl ${isSelected ? 'ring-4 ring-primary' : ''}`}
                    style={{ borderColor: employee.color }}
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <div className="text-center">
                      <span className="block text-sm font-semibold">{employee.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {employee.tasks.length} مهام
                      </span>
                    </div>
                  </div>

                  {/* عرض مؤشرات صغيرة للمهام حول الموظف */}
                  {!selectedEmployee && employee.tasks.slice(0, 3).map((task, taskIndex) => {
                    const taskAngle = angle + (taskIndex - 1) * 25
                    const taskRadius = 80
                    const taskX = Math.cos((taskAngle * Math.PI) / 180) * taskRadius
                    const taskY = Math.sin((taskAngle * Math.PI) / 180) * taskRadius
                    
                    return (
                      <div
                        key={task.id}
                        className="absolute"
                        style={{
                          left: `${taskX}px`,
                          top: `${taskY}px`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        <div
                          className="h-3 w-3 rounded-full border-2"
                          style={{
                            borderColor: employee.color,
                            backgroundColor: task.status === 'completed' ? '#10b981' : 
                                           task.status === 'postponed' ? '#f59e0b' :
                                           task.status === 'cancelled' ? '#ef4444' : '#6b7280'
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>

        {/* Employee Details Panel */}
        {selectedEmployee && (
          <div className="w-1/2">
            <Card className="h-full">
              <CardHeader className="border-b" style={{ borderColor: selectedEmployee.color }}>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className="h-12 w-12 rounded-full border-4"
                      style={{ borderColor: selectedEmployee.color }}
                    />
                    <div>
                      <div className="text-2xl">{selectedEmployee.name}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {selectedEmployee.tasks.length} مهام إجمالية
                      </div>
                    </div>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedEmployee(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-[680px] overflow-y-auto">
                  {selectedEmployee.tasks.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      لا توجد مهام حالياً
                    </div>
                  ) : (
                    selectedEmployee.tasks.map((task) => {
                      const timeRemaining = getTimeRemaining(task.deadline)
                      
                      return (
                        <div
                          key={task.id}
                          className="rounded-lg border-2 bg-card p-4 shadow-sm transition-all hover:shadow-md"
                          style={{ borderColor: selectedEmployee.color }}
                          onDoubleClick={() => handleTaskDoubleClick(task)}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-semibold text-foreground">
                                {task.title}
                              </h3>
                              {task.status === 'completed' && (
                                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-700">
                                  مكتملة ✓
                                </span>
                              )}
                              {task.status === 'postponed' && (
                                <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-700">
                                  مؤجلة
                                </span>
                              )}
                              {task.status === 'cancelled' && (
                                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-700">
                                  ملغية
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className={`h-4 w-4 ${timeRemaining.color}`} />
                                <span className={timeRemaining.color}>
                                  {timeRemaining.text}
                                </span>
                              </div>
                              <div className="text-muted-foreground">
                                {new Date(task.deadline).toLocaleString('ar-EG', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>

                            {task.status === 'postponed' && task.postponeReason && (
                              <div className="rounded bg-amber-500/10 p-3 text-sm">
                                <span className="font-medium">سبب التأجيل:</span> {task.postponeReason}
                              </div>
                            )}

                            {task.status === 'cancelled' && task.cancelReason && (
                              <div className="rounded bg-red-500/10 p-3 text-sm">
                                <span className="font-medium">سبب الإلغاء:</span> {task.cancelReason}
                              </div>
                            )}

                            {task.status === 'pending' && (
                              <div className="flex gap-2 pt-2">
                                <Button
                                  size="sm"
                                  variant="default"
                                  className="flex-1 gap-2"
                                  onClick={() => handleComplete(task)}
                                >
                                  <Check className="h-4 w-4" />
                                  تم الإنجاز
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 gap-2"
                                  onClick={() => {
                                    setSelectedTask(task)
                                    setActionDialog('postpone')
                                  }}
                                >
                                  <Pause className="h-4 w-4" />
                                  تأجيل
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="flex-1 gap-2"
                                  onClick={() => {
                                    setSelectedTask(task)
                                    setActionDialog('cancel')
                                  }}
                                >
                                  <X className="h-4 w-4" />
                                  إلغاء
                                </Button>
                              </div>
                            )}

                            <div className="text-xs text-muted-foreground pt-1">
                              اضغط مرتين للمزيد من التفاصيل
                            </div>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Postpone Dialog */}
      <Dialog
        open={actionDialog === 'postpone'}
        onOpenChange={(open) => !open && setActionDialog(null)}
      >
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>تأجيل المهمة</DialogTitle>
            <DialogDescription>
              يرجى كتابة سبب تأجيل المهمة
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب السبب هنا..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={handlePostpone} disabled={!reason.trim()}>
                تأكيد التأجيل
              </Button>
              <Button variant="outline" onClick={() => setActionDialog(null)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog
        open={actionDialog === 'cancel'}
        onOpenChange={(open) => !open && setActionDialog(null)}
      >
        <DialogContent dir="rtl">
          <DialogHeader>
            <DialogTitle>إلغاء المهمة</DialogTitle>
            <DialogDescription>
              يرجى كتابة سبب إلغاء المهمة
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="اكتب السبب هنا..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
            <div className="flex gap-2">
              <Button onClick={handleCancel} disabled={!reason.trim()} variant="destructive">
                تأكيد الإلغاء
              </Button>
              <Button variant="outline" onClick={() => setActionDialog(null)}>
                إلغاء
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
