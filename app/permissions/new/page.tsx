"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { PermissionRequestType } from "@/lib/permission-types"
import { PERMISSION_TYPES } from "@/lib/permission-types"
import { EMPLOYEES } from "@/lib/employees-data"

export default function NewPermissionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    employeeId: "",
    type: "" as PermissionRequestType | "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    amount: "",
  })

  const selectedType = PERMISSION_TYPES.find((t) => t.value === formData.type)
  const needsTimeRange = ["late_arrival", "early_departure", "work_assignment", "remote_work"].includes(formData.type)
  const needsAmount = formData.type === "advance_payment"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the permission request
    console.log("[v0] Permission request submitted:", formData)
    router.push("/permissions")
  }

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="container mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/permissions">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <ArrowRight className="h-4 w-4" />
              العودة
            </Button>
          </Link>
        </div>

        <Card className="p-6">
          <h1 className="mb-6 text-2xl font-bold">طلب إذن جديد</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="employee">الموظف</Label>
              <Select
                value={formData.employeeId}
                onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
              >
                <SelectTrigger id="employee">
                  <SelectValue placeholder="اختر الموظف" />
                </SelectTrigger>
                <SelectContent>
                  {EMPLOYEES.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name} - {emp.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">نوع الطلب</Label>
              <Select
                value={formData.type}
                onValueChange={(value: PermissionRequestType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="اختر نوع الطلب" />
                </SelectTrigger>
                <SelectContent>
                  {PERMISSION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">التاريخ</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {needsTimeRange && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">من</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">إلى</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
            )}

            {needsAmount && (
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ (ج.م)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">التفاصيل</Label>
              <Textarea
                id="description"
                placeholder="اكتب تفاصيل الطلب..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1 gap-2">
                <Send className="h-4 w-4" />
                إرسال الطلب
              </Button>
              <Link href="/permissions" className="flex-1">
                <Button type="button" variant="outline" className="w-full bg-transparent">
                  إلغاء
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
