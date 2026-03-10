"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, CheckCircle2, XCircle, Search } from "lucide-react"
import Link from "next/link"
import type { PermissionRequest, PermissionRequestStatus, PermissionRequestType } from "@/lib/permission-types"
import { PERMISSION_TYPES } from "@/lib/permission-types"

const MOCK_REQUESTS: PermissionRequest[] = [
  {
    id: "pr1",
    employeeId: "e2",
    employeeName: "شيماء عمر",
    type: "late_arrival",
    title: "حضور متأخر",
    description: "لدي موعد طبي صباحاً",
    date: "2024-11-15",
    startTime: "10:00",
    status: "pending",
    createdAt: "2024-11-14T10:30:00",
  },
  {
    id: "pr2",
    employeeId: "e3",
    employeeName: "مصطفي عادل",
    type: "advance_payment",
    title: "طلب سلفة",
    description: "احتياج شخصي عاجل",
    date: "2024-11-14",
    amount: 1000,
    status: "approved",
    approvedBy: "محمود شعراوي",
    approvedDate: "2024-11-14T14:00:00",
    createdAt: "2024-11-14T09:00:00",
  },
  {
    id: "pr3",
    employeeId: "e6",
    employeeName: "انس عماد",
    type: "work_assignment",
    title: "مهمة عمل",
    description: "زيارة عميل في المنطقة الشرقية",
    date: "2024-11-16",
    startTime: "09:00",
    endTime: "14:00",
    status: "approved",
    approvedBy: "محمود شعراوي",
    approvedDate: "2024-11-14T11:00:00",
    createdAt: "2024-11-14T08:00:00",
  },
]

export function PermissionRequestsList() {
  const [requests, setRequests] = useState<PermissionRequest[]>(MOCK_REQUESTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.employeeName.includes(searchQuery) ||
      request.title.includes(searchQuery) ||
      request.description.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: PermissionRequestStatus) => {
    const statusConfig = {
      pending: { label: "قيد المراجعة", variant: "outline" as const, icon: <Clock className="h-3 w-3" /> },
      approved: { label: "موافق عليه", variant: "default" as const, icon: <CheckCircle2 className="h-3 w-3" /> },
      rejected: { label: "مرفوض", variant: "destructive" as const, icon: <XCircle className="h-3 w-3" /> },
    }
    const config = statusConfig[status]
    return (
      <Badge variant={config.variant} className="gap-1">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const getTypeEmoji = (type: PermissionRequestType) => {
    return PERMISSION_TYPES.find((t) => t.value === type)?.icon || "📋"
  }

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">طلبات الإذن</h2>
        <Link href="/permissions/new">
          <Button className="gap-2">
            <span>+</span>
            طلب إذن جديد
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الطلبات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="pending">قيد المراجعة</SelectItem>
            <SelectItem value="approved">موافق عليه</SelectItem>
            <SelectItem value="rejected">مرفوض</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="نوع الطلب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأنواع</SelectItem>
            {PERMISSION_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.icon} {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="p-4 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
                  {getTypeEmoji(request.type)}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-semibold">{request.title}</h3>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">{request.employeeName}</p>
                  <p className="mb-2 text-sm">{request.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>التاريخ: {request.date}</span>
                    {request.startTime && <span>من: {request.startTime}</span>}
                    {request.endTime && <span>إلى: {request.endTime}</span>}
                    {request.amount && <span>المبلغ: {request.amount} ج.م</span>}
                  </div>
                  {request.status === "approved" && request.approvedBy && (
                    <p className="mt-2 text-xs text-green-600">
                      تمت الموافقة بواسطة: {request.approvedBy} -{" "}
                      {new Date(request.approvedDate!).toLocaleDateString("ar-EG")}
                    </p>
                  )}
                  {request.status === "rejected" && request.rejectionReason && (
                    <p className="mt-2 text-xs text-red-600">سبب الرفض: {request.rejectionReason}</p>
                  )}
                </div>
              </div>
              {request.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" variant="default" className="gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    موافقة
                  </Button>
                  <Button size="sm" variant="destructive" className="gap-1">
                    <XCircle className="h-4 w-4" />
                    رفض
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filteredRequests.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>لا توجد طلبات مطابقة للبحث</p>
          </div>
        )}
      </div>
    </Card>
  )
}
