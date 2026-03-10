'use client'

import { useState } from 'react'
import { LogIn, LogOut, MapPin, AlertCircle, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EMPLOYEES } from '@/lib/employees-data'
import { getCurrentLocation, isWithinRange, MAX_DISTANCE_METERS } from '@/lib/geolocation'

interface CheckRecord {
  employeeId: string
  type: 'in' | 'out'
  time: string
  date: string
}

export function CheckInOutPanel() {
  const [loading, setLoading] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [todayRecords, setTodayRecords] = useState<CheckRecord[]>([])

  const handleCheckInOut = async (employeeId: string, type: 'in' | 'out') => {
    setLoading(employeeId)
    setMessage(null)

    try {
      // الحصول على الموقع الحالي
      const location = await getCurrentLocation()
      
      // التحقق من المسافة
      if (!isWithinRange(location)) {
        setMessage({
          type: 'error',
          text: `أنت خارج نطاق المطبعة. يجب أن تكون على بعد ${MAX_DISTANCE_METERS} متر من الموقع`,
        })
        setLoading(null)
        return
      }

      // تسجيل الحضور/الانصراف
      const now = new Date()
      const newRecord: CheckRecord = {
        employeeId,
        type,
        time: now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        date: now.toLocaleDateString('ar-EG'),
      }

      setTodayRecords((prev) => [...prev, newRecord])
      setMessage({
        type: 'success',
        text: `تم تسجيل ${type === 'in' ? 'الحضور' : 'الانصراف'} بنجاح`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'حدث خطأ في تحديد الموقع',
      })
    } finally {
      setLoading(null)
    }
  }

  const getLastRecord = (employeeId: string) => {
    return todayRecords
      .filter((r) => r.employeeId === employeeId)
      .sort((a, b) => b.time.localeCompare(a.time))[0]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>تسجيل الحضور والانصراف</CardTitle>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>المسافة المسموحة: {MAX_DISTANCE_METERS} متر</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {message && (
          <div
            className={`mb-4 flex items-center gap-2 rounded-lg p-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-red-500/10 text-red-500'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {EMPLOYEES.map((employee) => {
            const lastRecord = getLastRecord(employee.id)
            const isCheckedIn = lastRecord?.type === 'in'
            const isLoading = loading === employee.id

            return (
              <Card key={employee.id} className="border border-border/50">
                <CardContent className="p-4">
                  <div className="mb-3 space-y-1">
                    <h3 className="font-semibold text-foreground">{employee.name}</h3>
                    <p className="text-xs text-muted-foreground">{employee.role}</p>
                    <p className="text-xs text-muted-foreground">شيفت: {employee.shift}</p>
                  </div>

                  {lastRecord && (
                    <div className="mb-3 rounded-md bg-muted/50 p-2 text-xs">
                      <p className="text-muted-foreground">
                        آخر تسجيل: {lastRecord.type === 'in' ? 'حضور' : 'انصراف'}
                      </p>
                      <p className="font-medium">{lastRecord.time}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={isCheckedIn ? 'outline' : 'default'}
                      className="flex-1"
                      onClick={() => handleCheckInOut(employee.id, 'in')}
                      disabled={isLoading || isCheckedIn}
                    >
                      <LogIn className="ml-1 h-4 w-4" />
                      حضور
                    </Button>
                    <Button
                      size="sm"
                      variant={!isCheckedIn ? 'outline' : 'destructive'}
                      className="flex-1"
                      onClick={() => handleCheckInOut(employee.id, 'out')}
                      disabled={isLoading || !isCheckedIn}
                    >
                      <LogOut className="ml-1 h-4 w-4" />
                      انصراف
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
