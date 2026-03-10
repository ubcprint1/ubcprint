"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, FileText, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  price: number
  total: number
}

export function QuickInvoiceGenerator() {
  const [items, setItems] = useState<InvoiceItem[]>([{ id: "1", description: "", quantity: 1, price: 0, total: 0 }])
  const [customerType, setCustomerType] = useState<"individual" | "company" | "agency">("individual")

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: "", quantity: 1, price: 0, total: 0 }])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "price") {
            updated.total = updated.quantity * updated.price
          }
          return updated
        }
        return item
      }),
    )
  }

  const subtotal = items.reduce((acc, item) => acc + item.total, 0)
  const tax = subtotal * 0.14 // 14% ضريبة القيمة المضافة
  const total = subtotal + tax

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-bold">إنشاء فاتورة سريعة</h2>
          <p className="text-sm text-muted-foreground">قم بإنشاء فاتورة بسرعة وسهولة</p>
        </div>
        <Badge variant="outline" className="text-lg">
          رقم الفاتورة: INV-{new Date().getTime().toString().slice(-6)}
        </Badge>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>اسم العميل</Label>
            <Input placeholder="اسم العميل" />
          </div>
          <div className="space-y-2">
            <Label>نوع العميل</Label>
            <Select value={customerType} onValueChange={(v: any) => setCustomerType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">فرد</SelectItem>
                <SelectItem value="company">شركة</SelectItem>
                <SelectItem value="agency">مكتب دعاية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>التاريخ</Label>
            <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-lg">بنود الفاتورة</Label>
            <Button size="sm" variant="outline" onClick={addItem} className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              إضافة بند
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-12 gap-2 rounded-lg border border-border p-3">
              <div className="col-span-5 space-y-1">
                <Label className="text-xs">الوصف</Label>
                <Input
                  placeholder="وصف المنتج أو الخدمة"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">الكمية</Label>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">السعر (ج.م)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                />
              </div>
              <div className="col-span-2 space-y-1">
                <Label className="text-xs">الإجمالي</Label>
                <Input value={item.total.toFixed(2)} disabled className="font-semibold" />
              </div>
              <div className="col-span-1 flex items-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="h-10 w-full"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-muted p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">المجموع الفرعي:</span>
              <span className="font-medium">{subtotal.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">ضريبة القيمة المضافة (14%):</span>
              <span className="font-medium">{tax.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-lg">
              <span className="font-bold">الإجمالي:</span>
              <span className="font-bold text-primary">{total.toFixed(2)} ج.م</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button className="flex-1 gap-2">
            <FileText className="h-4 w-4" />
            حفظ الفاتورة
          </Button>
          <Button variant="outline" className="flex-1 gap-2 bg-transparent">
            <Send className="h-4 w-4" />
            حفظ وإرسال
          </Button>
        </div>
      </div>
    </Card>
  )
}
