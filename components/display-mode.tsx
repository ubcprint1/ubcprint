'use client'

import { useEffect, useState } from 'react'
import { Activity, Printer, AlertCircle, CheckCircle2, Clock } from 'lucide-react'
import { MOCK_EMPLOYEES } from '@/lib/mindmap-types'

interface MachineStatus {
  id: string
  name: string
  status: 'running' | 'stopped' | 'maintenance' | 'error'
  currentTask?: string
  progress?: number
}

interface TaskStatus {
  id: string
  name: string
  status: 'pending' | 'in-progress' | 'completed'
  assignedTo: string
}

const MOCK_MACHINES: MachineStatus[] = [
  {
    id: '1',
    name: 'آلة الطباعة الرقمية',
    status: 'running',
    currentTask: 'طباعة كتيبات',
    progress: 65,
  },
  {
    id: '2',
    name: 'آلة التقطيع',
    status: 'running',
    currentTask: 'تقطيع بروشورات',
    progress: 40,
  },
  {
    id: '3',
    name: 'آلة التجليد',
    status: 'maintenance',
  },
  {
    id: '4',
    name: 'آلة الأوفست',
    status: 'stopped',
  },
]

export function DisplayMode() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const allTasks = MOCK_EMPLOYEES.flatMap(emp => emp.tasks)
  const MOCK_TASKS = allTasks.slice(0, 6).map(task => ({
    id: task.id,
    name: task.title,
    status: task.status === 'completed' ? 'completed' as const : 
            task.status === 'pending' ? 'in-progress' as const : 
            'pending' as const,
    assignedTo: MOCK_EMPLOYEES.find(emp => emp.tasks.some(t => t.id === task.id))?.name || '',
  }))

  const statusColors = {
    running: 'border-emerald-500 bg-emerald-500/10',
    stopped: 'border-slate-500 bg-slate-500/10',
    maintenance: 'border-amber-500 bg-amber-500/10',
    error: 'border-red-500 bg-red-500/10',
  }

  const taskStatusColors = {
    pending: 'border-slate-500 bg-slate-500/5',
    'in-progress': 'border-blue-500 bg-blue-500/5',
    completed: 'border-emerald-500 bg-emerald-500/5',
  }

  const runningMachines = MOCK_MACHINES.filter((m) => m.status === 'running').length
  const activeTasks = MOCK_TASKS.filter((t) => t.status === 'in-progress').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white" dir="rtl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Activity className="h-12 w-12 text-emerald-400" />
          <div>
            <h1 className="text-4xl font-bold">نظام إدارة المطبعة</h1>
            <p className="text-lg text-slate-400">مراقبة مباشرة للعمليات</p>
          </div>
        </div>
        <div className="text-left">
          <p className="text-5xl font-bold">
            {currentTime.toLocaleTimeString('ar-SA', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p className="text-xl text-slate-400">
            {currentTime.toLocaleDateString('ar-SA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-4 gap-6">
        <div className="rounded-xl bg-emerald-500/20 p-6 ring-2 ring-emerald-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-emerald-300">آلات تعمل</p>
              <p className="text-5xl font-bold">{runningMachines}</p>
            </div>
            <Printer className="h-16 w-16 text-emerald-400" />
          </div>
        </div>
        <div className="rounded-xl bg-blue-500/20 p-6 ring-2 ring-blue-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-blue-300">مهام نشطة</p>
              <p className="text-5xl font-bold">{activeTasks}</p>
            </div>
            <Clock className="h-16 w-16 text-blue-400" />
          </div>
        </div>
        <div className="rounded-xl bg-amber-500/20 p-6 ring-2 ring-amber-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-amber-300">صيانة</p>
              <p className="text-5xl font-bold">
                {MOCK_MACHINES.filter((m) => m.status === 'maintenance').length}
              </p>
            </div>
            <AlertCircle className="h-16 w-16 text-amber-400" />
          </div>
        </div>
        <div className="rounded-xl bg-purple-500/20 p-6 ring-2 ring-purple-500/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg text-purple-300">مكتملة اليوم</p>
              <p className="text-5xl font-bold">
                {MOCK_TASKS.filter((t) => t.status === 'completed').length}
              </p>
            </div>
            <CheckCircle2 className="h-16 w-16 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Machines */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">حالة الآلات</h2>
          <div className="space-y-4">
            {MOCK_MACHINES.map((machine) => (
              <div
                key={machine.id}
                className={`rounded-xl border-2 p-6 ${statusColors[machine.status]}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{machine.name}</h3>
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        machine.status === 'running'
                          ? 'bg-emerald-500'
                          : machine.status === 'maintenance'
                            ? 'bg-amber-500'
                            : machine.status === 'error'
                              ? 'bg-red-500'
                              : 'bg-slate-500'
                      }`}
                    >
                      {machine.status === 'running' && 'تعمل'}
                      {machine.status === 'stopped' && 'متوقفة'}
                      {machine.status === 'maintenance' && 'صيانة'}
                      {machine.status === 'error' && 'عطل'}
                    </span>
                  </div>
                  {machine.currentTask && (
                    <div className="space-y-2">
                      <p className="text-lg text-slate-300">{machine.currentTask}</p>
                      {machine.progress !== undefined && (
                        <div className="overflow-hidden rounded-full bg-slate-700">
                          <div
                            className="h-3 bg-gradient-to-l from-emerald-400 to-emerald-600 transition-all"
                            style={{ width: `${machine.progress}%` }}
                          />
                        </div>
                      )}
                      {machine.progress !== undefined && (
                        <p className="text-left text-lg font-bold text-emerald-400">
                          {machine.progress}%
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">المهام الحالية</h2>
          <div className="space-y-4">
            {MOCK_TASKS.map((task) => (
              <div
                key={task.id}
                className={`rounded-xl border-2 p-6 ${taskStatusColors[task.status]}`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{task.name}</h3>
                    <p className="text-lg text-slate-400">{task.assignedTo}</p>
                  </div>
                  <div className="text-center">
                    {task.status === 'completed' && (
                      <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                    )}
                    {task.status === 'in-progress' && (
                      <Clock className="h-12 w-12 text-blue-400 animate-pulse" />
                    )}
                    {task.status === 'pending' && (
                      <AlertCircle className="h-12 w-12 text-slate-400" />
                    )}
                    <p className="mt-2 text-sm font-semibold">
                      {task.status === 'completed' && 'مكتملة'}
                      {task.status === 'in-progress' && 'جارية'}
                      {task.status === 'pending' && 'قادمة'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// export default DisplayMode
