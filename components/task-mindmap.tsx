'use client'

import { useState } from 'react'
import { GitBranch, Plus, Check, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Task {
  id: string
  name: string
  status: 'pending' | 'in-progress' | 'completed' | 'blocked'
  subtasks?: Task[]
  assignee?: string
  priority?: 'low' | 'medium' | 'high'
}

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    name: 'طباعة 1000 كتيب',
    status: 'in-progress',
    assignee: 'محمد',
    priority: 'high',
    subtasks: [
      { id: '1.1', name: 'التصميم', status: 'completed', assignee: 'أحمد' },
      { id: '1.2', name: 'الطباعة', status: 'in-progress', assignee: 'محمد' },
      { id: '1.3', name: 'التجليد', status: 'pending', assignee: 'فاطمة' },
      { id: '1.4', name: 'التسليم', status: 'pending' },
    ],
  },
  {
    id: '2',
    name: 'بروشورات ملونة',
    status: 'in-progress',
    assignee: 'فاطمة',
    priority: 'medium',
    subtasks: [
      { id: '2.1', name: 'المراجعة', status: 'completed' },
      { id: '2.2', name: 'الطباعة', status: 'in-progress', assignee: 'فاطمة' },
    ],
  },
  {
    id: '3',
    name: 'لوحات إعلانية',
    status: 'pending',
    assignee: 'خالد',
    priority: 'low',
    subtasks: [
      { id: '3.1', name: 'التجهيز', status: 'pending' },
      { id: '3.2', name: 'الطباعة', status: 'pending' },
    ],
  },
]

const statusColors = {
  pending: 'border-slate-500 bg-slate-500/10',
  'in-progress': 'border-blue-500 bg-blue-500/10',
  completed: 'border-emerald-500 bg-emerald-500/10',
  blocked: 'border-red-500 bg-red-500/10',
}

const statusIcons = {
  pending: Clock,
  'in-progress': AlertCircle,
  completed: Check,
  blocked: AlertCircle,
}

const priorityColors = {
  low: 'bg-slate-500/20 text-slate-700',
  medium: 'bg-amber-500/20 text-amber-700',
  high: 'bg-red-500/20 text-red-700',
}

export function TaskMindmap() {
  const [tasks] = useState<Task[]>(MOCK_TASKS)
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(
    new Set(['1', '2'])
  )

  const toggleTask = (taskId: string) => {
    const newExpanded = new Set(expandedTasks)
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId)
    } else {
      newExpanded.add(taskId)
    }
    setExpandedTasks(newExpanded)
  }

  const renderTask = (task: Task, level: number = 0) => {
    const StatusIcon = statusIcons[task.status]
    const isExpanded = expandedTasks.has(task.id)
    const hasSubtasks = task.subtasks && task.subtasks.length > 0

    return (
      <div key={task.id} className="relative">
        <div
          className={`flex items-center gap-3 ${level > 0 ? 'mr-8 mt-3' : 'mt-4'}`}
        >
          {level > 0 && (
            <div className="absolute right-0 top-0 h-full w-8">
              <div className="absolute right-4 top-6 h-0.5 w-4 bg-border" />
              <div className="absolute right-4 top-0 h-6 w-0.5 bg-border" />
            </div>
          )}

          <button
            onClick={() => hasSubtasks && toggleTask(task.id)}
            className={`min-w-[280px] rounded-lg border-2 p-3 text-right transition-all hover:shadow-md ${
              statusColors[task.status]
            } ${hasSubtasks ? 'cursor-pointer' : ''}`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusIcon className="h-4 w-4" />
                  {hasSubtasks && (
                    <span className="text-xs">
                      {isExpanded ? '▼' : '◀'}
                    </span>
                  )}
                </div>
                {task.priority && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority === 'high' && 'عالي'}
                    {task.priority === 'medium' && 'متوسط'}
                    {task.priority === 'low' && 'منخفض'}
                  </span>
                )}
              </div>
              <p className="font-semibold">{task.name}</p>
              {task.assignee && (
                <p className="text-xs text-muted-foreground">{task.assignee}</p>
              )}
            </div>
          </button>
        </div>

        {hasSubtasks && isExpanded && (
          <div className="relative">
            {task.subtasks!.map((subtask) => renderTask(subtask, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <CardTitle>خريطة المهام التفاعلية</CardTitle>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            مهمة جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-4">
          <div className="min-w-max space-y-2">
            {tasks.map((task) => renderTask(task))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
