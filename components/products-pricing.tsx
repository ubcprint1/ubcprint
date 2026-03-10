'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Calculator } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import type { Product } from '@/lib/pricing-types'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'كوب سيراميك',
    description: 'كوب سيراميك أبيض قابل للطباعة',
    category: 'أكواب',
    cost: 15,
    priceIndividual: 35,
    priceCompany: 30,
    priceAdvertising: 28,
    stock: 150,
    unit: 'قطعة',
  },
  {
    id: '2',
    name: 'تيشيرت قطن',
    description: 'تيشيرت قطن 100%',
    category: 'ملابس',
    cost: 40,
    priceIndividual: 80,
    priceCompany: 70,
    priceAdvertising: 65,
    stock: 200,
    unit: 'قطعة',
  },
]

export function ProductsPricing() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [calcDialogOpen, setCalcDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
  // حاسبة الخدمات الإضافية
  const [laserWidth, setLaserWidth] = useState(1)
  const [laserHeight, setLaserHeight] = useState(1)
  const [uvWidth, setUvWidth] = useState(1)
  const [uvHeight, setUvHeight] = useState(1)
  const [co2Minutes, setCo2Minutes] = useState(1)

  const calculateLaserCost = () => {
    const area = laserWidth * laserHeight
    if (area <= 1) return 2
    return 2 + (area - 1) * 1.5 // كل سم مربع إضافي بـ 1.5 جنيه
  }

  const calculateUVCost = () => {
    const area = uvWidth * uvHeight
    if (area <= 1) return 2
    return 2 + (area - 1) * 1.5
  }

  const calculateCO2Cost = () => {
    return co2Minutes * 3
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">التسعير والمنتجات</CardTitle>
          <div className="flex gap-2">
            <Dialog open={calcDialogOpen} onOpenChange={setCalcDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Calculator className="h-4 w-4" />
                  حاسبة الخدمات
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>حاسبة تكلفة الخدمات الإضافية</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {/* حفر ليزر فايبر */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="mb-4 font-semibold">حفر ليزر فايبر</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>العرض (سم)</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={laserWidth}
                          onChange={(e) => setLaserWidth(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>الطول (سم)</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={laserHeight}
                          onChange={(e) => setLaserHeight(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                      <span className="text-sm text-muted-foreground">التكلفة: </span>
                      <span className="text-lg font-bold text-primary">
                        {calculateLaserCost().toFixed(2)} جنيه
                      </span>
                    </div>
                  </div>

                  {/* طباعة يوفي */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="mb-4 font-semibold">طباعة يوفي</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>العرض (سم)</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={uvWidth}
                          onChange={(e) => setUvWidth(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div>
                        <Label>الطول (سم)</Label>
                        <Input
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={uvHeight}
                          onChange={(e) => setUvHeight(parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                      <span className="text-sm text-muted-foreground">التكلفة: </span>
                      <span className="text-lg font-bold text-primary">
                        {calculateUVCost().toFixed(2)} جنيه
                      </span>
                    </div>
                  </div>

                  {/* قص ليزر CO2 */}
                  <div className="rounded-lg border border-border bg-muted/30 p-4">
                    <h3 className="mb-4 font-semibold">قص ليزر CO2</h3>
                    <div>
                      <Label>عدد الدقائق</Label>
                      <Input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={co2Minutes}
                        onChange={(e) => setCo2Minutes(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="mt-4 rounded-lg bg-primary/10 p-3 text-center">
                      <span className="text-sm text-muted-foreground">التكلفة: </span>
                      <span className="text-lg font-bold text-primary">
                        {calculateCO2Cost().toFixed(2)} جنيه
                      </span>
                      <span className="mr-2 text-xs text-muted-foreground">
                        (3 جنيه/دقيقة)
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  منتج جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl" dir="rtl">
                <DialogHeader>
                  <DialogTitle>إضافة منتج جديد</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>اسم المنتج</Label>
                      <Input placeholder="مثال: كوب سيراميك" />
                    </div>
                    <div>
                      <Label>الفئة</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cups">أكواب</SelectItem>
                          <SelectItem value="clothes">ملابس</SelectItem>
                          <SelectItem value="gifts">هدايا</SelectItem>
                          <SelectItem value="accessories">إكسسوارات</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>الوصف</Label>
                    <Input placeholder="وصف المنتج" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>التكلفة (جنيه)</Label>
                      <Input type="number" placeholder="0.00" />
                    </div>
                    <div>
                      <Label>الكمية المتوفرة</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-muted/50 p-4">
                    <h4 className="mb-3 font-semibold">أسعار البيع</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs">سعر الفرد (جنيه)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label className="text-xs">سعر الشركات (جنيه)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                      <div>
                        <Label className="text-xs">سعر مكاتب الدعاية (جنيه)</Label>
                        <Input type="number" placeholder="0.00" />
                      </div>
                    </div>
                  </div>

                  <Button className="mt-2">حفظ المنتج</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                      {product.category}
                    </span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{product.description}</p>
                  
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">التكلفة: </span>
                      <span className="font-semibold text-destructive">{product.cost} جنيه</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">فرد: </span>
                      <span className="font-semibold text-primary">{product.priceIndividual} جنيه</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">شركات: </span>
                      <span className="font-semibold text-primary">{product.priceCompany} جنيه</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">دعاية: </span>
                      <span className="font-semibold text-primary">{product.priceAdvertising} جنيه</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">المخزون: </span>
                      <span className="font-semibold">{product.stock} {product.unit}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
