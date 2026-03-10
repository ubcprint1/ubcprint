"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, ArrowRight } from "lucide-react"

interface PurchaseItem {
  id: string
  productId: string
  productName: string
  quantity: number
  unitCost: number
  total: number
}

export function PurchaseInvoiceForm() {
  const router = useRouter()
  const [suppliers] = useState([
    { id: "S001", name: "شركة الورق المصرية", phone: "01012345678" },
    { id: "S002", name: "مؤسسة الأحبار الحديثة", phone: "01098765432" },
    { id: "S003", name: "شركة المواد الخام", phone: "01155554444" },
  ])

  const [products] = useState([
    { id: "P001", name: "ورق A4", currentStock: 500 },
    { id: "P002", name: "كروت بيزنس", currentStock: 200 },
    { id: "P003", name: "بنرات إعلانية", currentStock: 50 },
    { id: "P004", name: "حبر طباعة أسود", currentStock: 30 },
    { id: "P005", name: "حبر طباعة ملون", currentStock: 25 },
  ])

  const [selectedSupplier, setSelectedSupplier] = useState("")
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0])
  const [invoiceNumber, setInvoiceNumber] = useState("")
  const [items, setItems] = useState<PurchaseItem[]>([])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(),
        productId: "",
        productName: "",
        quantity: 1,
        unitCost: 0,
        total: 0,
      },
    ])
  }

  const updateItem = (id: string, field: keyof PurchaseItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }

          if (field === "productId") {
            const product = products.find((p) => p.id === value)
            if (product) {
              updated.productName = product.name
            }
          }

          updated.total = updated.quantity * updated.unitCost
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
    const invoice = {
      supplierId: selectedSupplier,
      invoiceNumber,
      date: invoiceDate,
      items,
      total: calculateTotal(),
    }

    console.log("[v0] Purchase Invoice saved:", invoice)

    // إضافة الكميات تلقائياً للمخزون
    items.forEach((item) => {
      console.log(`[v0] Adding ${item.quantity} to product ${item.productId} in inventory`)
      console.log(`[v0] Recording inbound movement: ${item.productName} +${item.quantity}`)
    })

    // تسجيل قيد محاسبي
    console.log("[v0] Creating accounting entry: Debit Purchases, Credit Supplier")

    alert("تم حفظ فاتورة الشراء وتحديث المخزون بنجاح!")
    router.push("/accounting")
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">فاتورة استلام بضائع من مورد</h1>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowRight className="ml-2 h-4 w-4" />
          رجوع
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>بيانات الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>المورد *</Label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المورد" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>رقم الفاتورة *</Label>
              <Input
                placeholder="P-2024-001"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>التاريخ *</Label>
              <Input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>المنتجات المستلمة</CardTitle>
            <Button onClick={addItem} size="sm">
              <Plus className="ml-2 h-4 w-4" />
              إضافة منتج
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="grid gap-4 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <Label>المنتج</Label>
                      <Select value={item.productId} onValueChange={(value) => updateItem(item.id, "productId", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنتج" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} (متوفر: {product.currentStock})
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
                      <Label>تكلفة الوحدة</Label>
                      <Input
                        type="number"
                        value={item.unitCost}
                        onChange={(e) => updateItem(item.id, "unitCost", Number(e.target.value))}
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
                </Card>
              ))}
              {items.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">لم يتم إضافة أي منتجات بعد</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ملخص الفاتورة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>عدد المنتجات:</span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>الإجمالي النهائي:</span>
                <span className="text-green-600">{calculateTotal().toFixed(2)} ج.م</span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleSave}
              disabled={!selectedSupplier || !invoiceNumber || items.length === 0}
            >
              <Save className="ml-2 h-4 w-4" />
              حفظ وإضافة للمخزون
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
