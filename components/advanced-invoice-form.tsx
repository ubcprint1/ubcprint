"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, ArrowRight } from "lucide-react"

interface InvoiceItem {
  id: string
  type: "product" | "service"
  itemId: string
  itemName: string
  quantity: number
  unitPrice: number
  total: number
  machineId?: string
  machineName?: string
}

export function AdvancedInvoiceForm() {
  const router = useRouter()
  const [customers] = useState([
    { id: "C001", name: "شركة الزهور للدعاية والإعلان", type: "company" },
    { id: "C002", name: "محمد أحمد", type: "individual" },
    { id: "C003", name: "مؤسسة الأعمال المتقدمة", type: "company" },
  ])

  const [products] = useState([
    { id: "P001", name: "ورق A4", stock: 500, price: 50 },
    { id: "P002", name: "كروت بيزنس", stock: 200, price: 2 },
    { id: "P003", name: "بنرات إعلانية", stock: 50, price: 150 },
  ])

  const [services] = useState([
    { id: "S001", name: "حفر ليزر فايبر", machineId: "M001", machineName: "ماكينة حفر ليزر فايبر", basePrice: 2 },
    { id: "S002", name: "طباعة يوفي", machineId: "M002", machineName: "ماكينة طباعة يوفي", basePrice: 15 },
    { id: "S003", name: "قص ليزر CO2", machineId: "M003", machineName: "ماكينة قص ليزر CO2", basePrice: 180 },
  ])

  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [notes, setNotes] = useState("")

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        type: "product",
        itemId: "",
        itemName: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ])
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }

          // عند تغيير نوع المنتج/الخدمة
          if (field === "itemId") {
            if (updated.type === "product") {
              const product = products.find((p) => p.id === value)
              if (product) {
                updated.itemName = product.name
                updated.unitPrice = product.price
              }
            } else {
              const service = services.find((s) => s.id === value)
              if (service) {
                updated.itemName = service.name
                updated.unitPrice = service.basePrice
                updated.machineId = service.machineId
                updated.machineName = service.machineName
              }
            }
          }

          // حساب الإجمالي
          updated.total = updated.quantity * updated.unitPrice
          return updated
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSave = () => {
    // حفظ الفاتورة
    const invoice = {
      customerId: selectedCustomer,
      date: invoiceDate,
      items,
      total: calculateTotal(),
      notes,
    }

    console.log("[v0] Invoice saved:", invoice)

    // تحديث المخزون (خصم الكميات)
    items.forEach((item) => {
      if (item.type === "product") {
        console.log(`[v0] Deducting ${item.quantity} from product ${item.itemId}`)
      } else if (item.machineId) {
        console.log(`[v0] Adding revenue ${item.total} to machine ${item.machineId}`)
      }
    })

    alert("تم حفظ الفاتورة بنجاح!")
    router.push("/accounting")
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">إصدار فاتورة مبيعات</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowRight className="ml-2 h-4 w-4" />
          رجوع
        </Button>
      </div>

      <div className="grid gap-6">
        {/* بيانات الفاتورة */}
        <Card>
          <CardHeader>
            <CardTitle>بيانات الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>العميل *</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر العميل" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.type === "company" ? "شركة" : "فرد"})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>التاريخ *</Label>
              <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* الأصناف */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>الأصناف</CardTitle>
            <Button onClick={addItem} size="sm">
              <Plus className="ml-2 h-4 w-4" />
              إضافة صنف
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <Card key={item.id} className="p-4">
                  <div className="grid gap-4 md:grid-cols-6">
                    <div>
                      <Label>النوع</Label>
                      <Select value={item.type} onValueChange={(value) => updateItem(item.id, "type", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">منتج</SelectItem>
                          <SelectItem value="service">خدمة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label>الصنف</Label>
                      <Select value={item.itemId} onValueChange={(value) => updateItem(item.id, "itemId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الصنف" />
                        </SelectTrigger>
                        <SelectContent>
                          {item.type === "product"
                            ? products.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name} (متاح: {product.stock})
                                </SelectItem>
                              ))
                            : services.map((service) => (
                                <SelectItem key={service.id} value={service.id}>
                                  {service.name}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الكمية</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                        min="1"
                      />
                    </div>
                    <div>
                      <Label>السعر</Label>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                        min="0"
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Label>الإجمالي</Label>
                        <Input value={item.total.toFixed(2)} readOnly className="bg-gray-50" />
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {item.machineName && <div className="mt-2 text-sm text-blue-600">ماكينة: {item.machineName}</div>}
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* الملاحظات والإجمالي */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>ملاحظات</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="أضف ملاحظات إضافية..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ملخص الفاتورة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>عدد الأصناف:</span>
                  <span className="font-semibold">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold">{calculateTotal().toFixed(2)} ج.م</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>الإجمالي النهائي:</span>
                  <span className="text-blue-600">{calculateTotal().toFixed(2)} ج.م</span>
                </div>
              </div>
              <Button className="w-full" onClick={handleSave} disabled={!selectedCustomer || items.length === 0}>
                <Save className="ml-2 h-4 w-4" />
                حفظ الفاتورة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
