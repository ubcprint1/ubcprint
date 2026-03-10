'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'task' | 'machine' | 'attendance' | 'general'
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'مهمة جديدة',
    message: 'تم إضافة مهمة طباعة 1000 كتيب',
    time: 'منذ 5 دقائق',
    read: false,
    type: 'task',
  },
  {
    id: '2',
    title: 'تحذير آلة',
    message: 'آلة الطباعة الرقمية تحتاج صيانة',
    time: 'منذ 15 دقيقة',
    read: false,
    type: 'machine',
  },
  {
    id: '3',
    title: 'تسجيل دخول متأخر',
    message: 'محمد علي سجل دخول متأخر 30 دقيقة',
    time: 'منذ ساعة',
    read: true,
    type: 'attendance',
  },
  {
    id: '4',
    title: 'مهمة مكتملة',
    message: 'تم إنهاء طباعة البروشورات',
    time: 'منذ ساعتين',
    read: true,
    type: 'task',
  },
]

const typeColors = {
  task: 'bg-blue-500/10 text-blue-500',
  machine: 'bg-amber-500/10 text-amber-500',
  attendance: 'bg-violet-500/10 text-violet-500',
  general: 'bg-slate-500/10 text-slate-500',
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS)
  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">التنبيهات</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={markAllAsRead}
              >
                تعليم الكل كمقروء
              </Button>
            )}
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              لا توجد تنبيهات جديدة
            </div>
          ) : (
            notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`w-full border-b border-border p-4 text-right transition-colors hover:bg-accent ${
                  !notification.read ? 'bg-accent/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                      !notification.read ? 'bg-primary' : 'bg-transparent'
                    }`}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-medium ${
                          typeColors[notification.type]
                        }`}
                      >
                        {notification.type === 'task' && 'مهمة'}
                        {notification.type === 'machine' && 'آلة'}
                        {notification.type === 'attendance' && 'حضور'}
                        {notification.type === 'general' && 'عام'}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="border-t border-border p-2">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              عرض جميع التنبيهات
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
