'use client'

import { useState } from 'react'
import { Employee, Task } from '@/lib/mindmap-types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TasksCalendarProps {
  employees: Employee[]
  currentUserId?: string
}

export function TasksCalendar({ employees, currentUserId }: TasksCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get all tasks or only current user's tasks
  const allTasks: Task[] = currentUserId
    ? employees.find(emp => emp.id === currentUserId)?.tasks || []
    : employees.flatMap(emp => emp.tasks)

  // Group tasks by date
  const tasksByDate = allTasks.reduce((acc, task) => {
    const date = new Date(task.deadline).toLocaleDateString('ar-EG')
    if (!acc[date]) acc[date] = []
    acc[date].push(task)
    return acc
  }, {} as Record<string, Task[]>)

  const getEmployeeName = (taskId: string) => {
    for (const emp of employees) {
      if (emp.tasks.some(t => t.id === taskId)) {
        return emp.name
      }
    }
    return ''
  }

  const getEmployeeColor = (taskId: string) => {
    for (const emp of employees) {
      if (emp.tasks.some(t => t.id === taskId)) {
        return emp.color
      }
    }
    return '#6b7280'
  }

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const statusEmoji = {
    pending: '⏳',
    completed: '✓',
    postponed: '⏸',
    cancelled: '✗',
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>تقويم المهام</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={prevMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="min-w-[120px] text-center text-sm font-semibold">
              {currentDate.toLocaleDateString('ar-EG', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <Button size="sm" variant="outline" onClick={nextMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dateKey = date.toLocaleDateString('ar-EG')
            const tasksForDay = tasksByDate[dateKey] || []
            const isToday =
              date.toDateString() === new Date().toDateString()

            return (
              <div
                key={day}
                className={`min-h-[100px] rounded-lg border p-2 ${
                  isToday ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <div className="mb-1 text-center text-sm font-semibold">
                  {day}
                </div>
                <div className="space-y-1">
                  {tasksForDay.map(task => {
                    const employeeName = getEmployeeName(task.id)
                    const employeeColor = getEmployeeColor(task.id)
                    
                    return (
                      <div
                        key={task.id}
                        className="rounded border-r-2 bg-card p-1 text-xs"
                        style={{ borderColor: employeeColor }}
                      >
                        <div className="flex items-center gap-1">
                          <span>{statusEmoji[task.status]}</span>
                          <span className="truncate font-medium">
                            {task.title}
                          </span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          <span>
                            {new Date(task.deadline).toLocaleTimeString('ar-EG', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        {!currentUserId && (
                          <div
                            className="mt-0.5 text-[10px]"
                            style={{ color: employeeColor }}
                          >
                            {employeeName}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
