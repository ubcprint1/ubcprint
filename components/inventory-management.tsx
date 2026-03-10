"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, AlertTriangle, TrendingUp, Search, Plus } from "lucide-react"
import type { InventoryItem } from "@/lib/inventory-types"

const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "1",
    productId: "1",
    productName: "كوب سيراميك",
    quantity: 150,
    cost: 15,
    sellingPrice: 35,
    lastUpdated: "2024-01-15",
    location: "رف A-1",
    minStock: 50,
    category: "أكواب",
  },
  {
    id: "2",
    productId: "2",
    productName: "تيشيرت قطن",
    quantity: 200,
    cost: 40,
    sellingPrice: 80,
    lastUpdated: "2024-01-14",
    location: "رف B-2",
    minStock: 100,
    category: "ملابس",
  },
  {
    id: "3",
    productId: "3",
    productName: "دفتر ملاحظات",
    quantity: 30,
    cost: 8,
    sellingPrice: 20,
    lastUpdated: "2024-01-10",
    location: "رف C-1",
    minStock: 50,
    category: "قرطاسية",
  },
]

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  const filteredInventory = inventory.filter(
    (item) =>
      item.productName.includes(searchTerm) || item.category.includes(searchTerm) || item.location.includes(searchTerm),
  )

  const lowStockItems = inventory.filter((item) => item.quantity <= item.minStock)
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0)
  const totalProfit = inventory.reduce((sum, item) => sum + item.quantity * (item.sellingPrice - item.cost), 0)

  return (
    <div className="space-y-6">
      {/* إحصائيات المخزن */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي قيمة المخزون</p>
              <p className="text-2xl font-bold">{totalValue.toFixed(2)} ج.م</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الربح المتوقع</p>
              <p className="text-2xl font-bold text-green-500">{totalProfit.toFixed(2)} ج.م</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-destructive/10 p-3">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">منتجات منخفضة المخزون</p>
              <p className="text-2xl font-bold text-destructive">{lowStockItems.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* جدول المخزون */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">المخزون</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    إضافة منتج
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة منتج جديد للمخزن</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label>اسم المنتج</Label>
                      <Input placeholder="أدخل اسم المنتج" />
                    </div>
                    <div className="space-y-2">
                      <Label>الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cups">أكواب</SelectItem>
                          <SelectItem value="clothes">ملابس</SelectItem>
                          <SelectItem value="stationery">قرطاسية</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>الكمية</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>التكلفة (ج.م)</Label>
                      <Input type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>سعر البيع (ج.م)</Label>
                      <Input type="number" step="0.01" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label>الموقع</Label>
                      <Input placeholder="مثال: رف A-1" />
                    </div>
                    <div className="space-y-2">
                      <Label>الحد الأدنى للمخزون</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button>حفظ المنتج</Button>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      إلغاء
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="relative w-64">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="بحث في المخزون..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredInventory.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg border p-4 transition-colors hover:bg-muted/50 ${
                  item.quantity <= item.minStock ? "border-destructive bg-destructive/5" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-semibold">{item.productName}</h3>
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {item.category}
                      </span>
                      {item.quantity <= item.minStock && (
                        <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">
                          <AlertTriangle className="h-3 w-3" />
                          مخزون منخفض
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">الكمية: </span>
                        <span className="font-semibold">{item.quantity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">التكلفة: </span>
                        <span className="font-semibold text-destructive">{item.cost} ج.م</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">سعر البيع: </span>
                        <span className="font-semibold text-primary">{item.sellingPrice} ج.م</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الربح: </span>
                        <span className="font-semibold text-green-500">{item.sellingPrice - item.cost} ج.م</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">الموقع: </span>
                        <span className="font-semibold">{item.location}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">آخر تحديث: </span>
                        <span className="text-xs">{item.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
