"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useClientAuthStore } from "@/lib/client-auth-store"
import { useClientsStore } from "@/lib/clients-store"
import { ShoppingBag, AlertCircle } from "lucide-react"
import Link from "next/link"

export function ClientLoginInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/client/portal"
  const login = useClientAuthStore((state) => state.login)
  const authenticateClient = useClientsStore((state) => state.authenticateClient)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const client = authenticateClient(email, password)
    if (client) {
      login({ id: client.id, email: client.email, name: client.name, phone: client.phone })
      router.push(redirectTo)
    } else {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center"><ShoppingBag className="h-8 w-8 text-white" /></div></div>
          <CardTitle className="text-2xl">تسجيل دخول العملاء</CardTitle>
          <CardDescription>أدخل بيانات حسابك لمتابعة طلباتك</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-800"><AlertCircle className="h-4 w-4" /><span className="text-sm">{error}</span></div>}
            <div className="space-y-2"><Label htmlFor="email">البريد الإلكتروني</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="space-y-2"><Label htmlFor="password">كلمة المرور</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>{loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}</Button>
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <div>ليس لديك حساب؟ <Link href={`/client/register${redirectTo !== "/client/portal" ? `?redirect=${redirectTo}` : ""}`} className="text-blue-600 hover:underline">إنشاء حساب جديد</Link></div>
              <div><Link href="/" className="text-blue-600 hover:underline">العودة إلى الموقع</Link></div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
