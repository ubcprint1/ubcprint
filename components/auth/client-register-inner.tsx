"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useClientsStore } from "@/lib/clients-store"
import { useClientAuthStore } from "@/lib/client-auth-store"
import { ShoppingBag, AlertCircle } from "lucide-react"
import Link from "next/link"

export function ClientRegisterInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/client/portal"
  const addClient = useClientsStore((state) => state.addClient)
  const getClientByEmail = useClientsStore((state) => state.getClientByEmail)
  const login = useClientAuthStore((state) => state.login)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", password: "", confirmPassword: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const existingClient = getClientByEmail(formData.email)
    if (existingClient) return setError("هذا البريد الإلكتروني مسجل بالفعل")
    if (formData.password !== formData.confirmPassword) return setError("كلمة المرور غير متطابقة")
    if (formData.password.length < 6) return setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
    setLoading(true)
    try {
      const newClient = addClient({ name: formData.name, email: formData.email, phone: formData.phone, address: formData.address, password: formData.password })
      login({ id: newClient.id, email: newClient.email, name: newClient.name, phone: newClient.phone })
      router.push(redirectTo)
    } catch {
      setError("حدث خطأ أثناء إنشاء الحساب")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 py-12" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center"><ShoppingBag className="h-8 w-8 text-white" /></div></div>
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
          <CardDescription>أنشئ حسابك للبدء في طلب خدمات الطباعة</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-800"><AlertCircle className="h-4 w-4" /><span className="text-sm">{error}</span></div>}
            <div className="space-y-2"><Label htmlFor="name">الاسم الكامل</Label><Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
            <div className="space-y-2"><Label htmlFor="email">البريد الإلكتروني</Label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
            <div className="space-y-2"><Label htmlFor="phone">رقم الهاتف</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required /></div>
            <div className="space-y-2"><Label htmlFor="address">العنوان</Label><Input id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required /></div>
            <div className="space-y-2"><Label htmlFor="password">كلمة المرور</Label><Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required /></div>
            <div className="space-y-2"><Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label><Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required /></div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>{loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}</Button>
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <div>لديك حساب بالفعل؟ <Link href="/client/login" className="text-blue-600 hover:underline">تسجيل الدخول</Link></div>
              <div><Link href="/" className="text-blue-600 hover:underline">العودة إلى الموقع</Link></div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
