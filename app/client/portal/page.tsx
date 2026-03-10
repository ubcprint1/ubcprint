"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, Package, Clock, CheckCircle, User, LogOut } from "lucide-react"
import Link from "next/link"
import type { User as UserType } from "@/lib/auth-types"

export default function ClientPortal() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role !== "client") {
        router.push("/")
        return
      }
      setUser(parsedUser)
    } else {
      router.push("/client/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">لوحة تحكم العميل</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">مرحباً {user.name}</h2>
          <p className="text-slate-600">إليك نظرة عامة على حسابك وطلباتك</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                إجمالي الطلبات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                قيد التنفيذ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                مكتملة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>طلباتي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <Package className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p className="mb-4">لا توجد طلبات حالياً</p>
                <Link href="/products">
                  <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    تصفح المنتجات
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-slate-500">الاسم</div>
                <div className="font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">البريد الإلكتروني</div>
                <div className="font-medium">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">رقم الهاتف</div>
                <div className="font-medium">{user.phone}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">العنوان</div>
                <div className="font-medium">{user.address}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
