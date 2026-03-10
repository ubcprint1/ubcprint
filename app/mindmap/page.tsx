"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { getAllTasks, getTasksForEmployee, filterTasks, groupTasksByStatus } from "@/lib/tasks-system"
import { EMPLOYEES } from "@/lib/employees-data"
import { MOCK_ORDERS } from "@/lib/orders-data"
import { TasksKanbanView } from "@/components/tasks-kanban-view"
import { TasksListView } from "@/components/tasks-list-view"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, LayoutGrid, List, Search } from "lucide-react"

export default function TasksPage() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [employeeFilter, setEmployeeFilter] = useState("all")
  const [orderFilter, setOrderFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // محاكاة المستخدم الحالي (undefined = مدير يرى الكل)
  const currentUserId = undefined // أو ضع id موظف معين

  // الحصول على المهام
  const allTasks = useMemo(() => {
    return currentUserId ? getTasksForEmployee(currentUserId) : getAllTasks()
  }, [currentUserId])

  // تطبيق الفلاتر
  const filteredTasks = useMemo(() => {
    let tasks = allTasks

    // فلترة بالبحث
    if (searchQuery) {
      tasks = tasks.filter(
        (task) =>
          task.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.productName.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // فلترة بالفلاتر
    tasks = filterTasks(tasks, {
      status: statusFilter,
      employeeId: employeeFilter,
      orderId: orderFilter,
      priority: priorityFilter,
    })

    return tasks
  }, [allTasks, searchQuery, statusFilter, employeeFilter, orderFilter, priorityFilter])

  // تجميع حسب الحالة للعرض Kanban
  const tasksByStatus = useMemo(() => {
    return groupTasksByStatus(filteredTasks)
  }, [filteredTasks])

  // إحصائيات
  const stats = {
    total: filteredTasks.length,
    pending: filteredTasks.filter((t) => t.status === "pending").length,
    inProgress: filteredTasks.filter((t) => t.status === "in_progress").length,
    blocked: filteredTasks.filter((t) => t.status === "blocked").length,
    overdue: filteredTasks.filter((t) => t.daysRemaining < 0).length,
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">إدارة المهام</h1>
              {currentUserId && <span className="text-sm text-muted-foreground">(عرض مهامك فقط)</span>}
            </div>
            <div className="flex items-center gap-4">
              <NotificationsDropdown />
              <span className="text-sm text-muted-foreground">مرحباً، أحمد</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* الإحصائيات */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">إجمالي المهام</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-700">{stats.pending}</div>
            <div className="text-sm text-yellow-600">قيد الانتظار</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-700">{stats.inProgress}</div>
            <div className="text-sm text-blue-600">قيد التنفيذ</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-700">{stats.blocked}</div>
            <div className="text-sm text-red-600">معلقة</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-700">{stats.overdue}</div>
            <div className="text-sm text-orange-600">متأخرة</div>
          </div>
        </div>

        {/* الفلاتر والبحث */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في المهام..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="in_progress">قيد التنفيذ</SelectItem>
                <SelectItem value="blocked">معلقة</SelectItem>
              </SelectContent>
            </Select>

            {!currentUserId && (
              <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="الموظف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الموظفين</SelectItem>
                  {EMPLOYEES.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value="all" onValueChange={setOrderFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="الطلب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الطلبات</SelectItem>
                {MOCK_ORDERS.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    {order.orderNumber}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="الأولوية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأولويات</SelectItem>
                <SelectItem value="urgent">عاجل</SelectItem>
                <SelectItem value="high">عالي</SelectItem>
                <SelectItem value="medium">متوسط</SelectItem>
                <SelectItem value="low">منخفض</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "kanban" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("kanban")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* عرض المهام */}
        {viewMode === "kanban" ? (
          <TasksKanbanView tasksByStatus={tasksByStatus} />
        ) : (
          <TasksListView tasks={filteredTasks} />
        )}
      </main>
    </div>
  )
}
