"use client"

import { useState } from "react"
import { ArrowRight, Plus, Trash2, Save } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewQuotationPage() {
  const [items, setItems] = useState([{ id: 1, description: "", quantity: 1, unitPrice: 0 }])

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const handleSave = () => {
    alert("تم حفظ عرض السعر بنجاح!")
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/accounting">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">إنشاء عرض سعر جديد</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>بيانات العميل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customer">اسم العميل</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر العميل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">شركة الأعمال المتقدمة</SelectItem>
                    <SelectItem value="2">مؤسسة التسويق الرقمي</SelectItem>
                    <SelectItem value="3">شركة البناء الحديث</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">تاريخ العرض</Label>
                <Input type="date" id="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="validUntil">صالح حتى</Label>
                <Input type="date" id="validUntil" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quotationNumber">رقم العرض</Label>
                <Input id="quotationNumber" placeholder="QT-2024-001" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>بنود العرض</CardTitle>
              <Button onClick={addItem} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة بند
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                <div className="flex-1 space-y-2">
                  <Label>الوصف</Label>
                  <Input placeholder="وصف الخدمة أو المنتج" />
                </div>
                <div className="w-24 space-y-2">
                  <Label>الكمية</Label>
                  <Input type="number" min="1" defaultValue="1" />
                </div>
                <div className="w-32 space-y-2">
                  <Label>السعر</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="flex items-end">
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} disabled={items.length === 1}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <div className="w-64 space-y-2 rounded-lg bg-accent p-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-medium">{calculateSubtotal().toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة (14%):</span>
                  <span className="font-medium">{(calculateSubtotal() * 0.14).toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg font-bold">
                  <span>الإجمالي:</span>
                  <span className="text-primary">{(calculateSubtotal() * 1.14).toLocaleString()} ج.م</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملاحظات إضافية</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea placeholder="أضف أي ملاحظات أو شروط للعرض..." rows={4} />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Link href="/accounting">
            <Button variant="outline">إلغاء</Button>
          </Link>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            حفظ عرض السعر
          </Button>
        </div>
      </div>
    </div>
  )
}
