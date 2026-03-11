"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrdersStore } from "@/lib/orders-store"
import { Search, Package, Clock } from "lucide-react"

export function TrackOrderInner() {
  const searchParams = useSearchParams()
  const initialOrder = searchParams.get("order") || ""
  const orders = useOrdersStore((state) => state.orders)
  const [orderNumber, setOrderNumber] = useState(initialOrder)
  const [searched, setSearched] = useState<any | null>(null)
  const [notFound, setNotFound] = useState(false)

  function handleSearch() {
    const found = orders.find((o) => o.orderNumber === orderNumber)
    setSearched(found || null)
    setNotFound(!found)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12" dir="rtl">
      <div className="mx-auto max-w-3xl px-4 space-y-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader><CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> تتبع الطلب</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="orderNumber">رقم الطلب</Label>
              <div className="flex gap-2">
                <Input id="orderNumber" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="مثال: ORD-1001" />
                <Button onClick={handleSearch}>بحث</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">يمكنك تتبع حالة الطلب ومعرفة المرحلة الحالية للتنفيذ.</p>
          </CardContent>
        </Card>

        {searched ? (
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle>نتيجة التتبع</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border p-4"><strong>رقم الطلب:</strong> {searched.orderNumber}</div>
                <div className="rounded-xl border p-4"><strong>العميل:</strong> {searched.customerName}</div>
                <div className="rounded-xl border p-4"><strong>المنتج:</strong> {searched.productName}</div>
                <div className="rounded-xl border p-4"><strong>الكمية:</strong> {searched.quantity}</div>
              </div>
              <div className="rounded-xl border p-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2"><Package className="h-5 w-5 text-primary" /></div>
                <div>
                  <div className="font-medium">الحالة الحالية: {searched.stageLabel || searched.status}</div>
                  <div className="text-sm text-muted-foreground">{searched.deliveryDate ? `التسليم المتوقع: ${searched.deliveryDate}` : "التسليم حسب الجدولة"}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {notFound ? (
          <Card className="rounded-2xl shadow-sm">
            <CardContent className="py-10 text-center text-muted-foreground">
              <Clock className="mx-auto mb-3 h-6 w-6" />
              لم يتم العثور على طلب بهذا الرقم.
            </CardContent>
          </Card>
        ) : null}

        <div className="text-center">
          <Link href="/client/login" className="text-primary hover:underline">دخول بوابة العميل</Link>
        </div>
      </div>
    </div>
  )
}
