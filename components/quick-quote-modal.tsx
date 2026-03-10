"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Sparkles, Plus, X } from "lucide-react"
import { MOCK_QUOTE_REQUESTS } from "@/lib/quote-requests-types"
import type { QuoteRequest, QuoteProduct } from "@/lib/quote-requests-types"

interface QuickQuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRODUCT_TYPES = [
  "كروت شخصية",
  "بروشورات",
  "فلايرز",
  "بنرات",
  "ستاندات",
  "أكواب",
  "تيشيرتات",
  "دفاتر",
  "أظرف",
  "أختام",
  "لوحات",
  "ستيكرز",
  "نوع مخصص",
]

const SIZES = ["A4", "A5", "A6", "50x70 سم", "100x200 سم", "مقاس مخصص"]

const QUANTITIES = ["50", "100", "250", "500", "1000", "2000", "كمية مخصصة"]

const COLORS = ["لون واحد", "لونين", "3 ألوان", "4 ألوان (CMYK)", "ألوان كاملة"]

export function QuickQuoteModal({ open, onOpenChange }: QuickQuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    serviceType: "",
    notes: "",
  })

  const [products, setProducts] = useState<QuoteProduct[]>([
    {
      productType: "",
      customProductType: "",
      size: "",
      customSize: "",
      quantity: "",
      customQuantity: "",
      printColors: "",
    },
  ])

  const [loading, setLoading] = useState(false)

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productType: "",
        customProductType: "",
        size: "",
        customSize: "",
        quantity: "",
        customQuantity: "",
        printColors: "",
      },
    ])
  }

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index))
    }
  }

  const updateProduct = (index: number, field: keyof QuoteProduct, value: string) => {
    const newProducts = [...products]
    newProducts[index] = { ...newProducts[index], [field]: value }
    setProducts(newProducts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newRequest: QuoteRequest = {
      id: `QR-${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      serviceType: formData.serviceType as any,
      products: products,
      notes: formData.notes,
      createdAt: new Date(),
      status: "جديد",
    }
    MOCK_QUOTE_REQUESTS.push(newRequest)

    let productsMessage = ""
    products.forEach((product, index) => {
      const productType = product.productType === "نوع مخصص" ? product.customProductType : product.productType
      const size = product.size === "مقاس مخصص" ? product.customSize : product.size
      const quantity = product.quantity === "كمية مخصصة" ? product.customQuantity : product.quantity

      productsMessage += `
📦 *المنتج ${index + 1}:*
   • النوع: ${productType}
   • المقاس: ${size}
   • الكمية: ${quantity}
   • الألوان: ${product.printColors}
`
    })

    const message = `
🎨 *طلب عرض سعر جديد*

👤 الاسم: ${formData.name}
📱 الجوال: ${formData.phone}
🔹 نوع الخدمة: ${formData.serviceType}
${productsMessage}
${formData.notes ? `📝 ملاحظات: ${formData.notes}` : ""}

رقم الطلب: ${newRequest.id}
    `.trim()

    const whatsappNumber = "201036930965"
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
      setLoading(false)
      onOpenChange(false)

      // إعادة تعيين النموذج
      setFormData({
        name: "",
        phone: "",
        serviceType: "",
        notes: "",
      })
      setProducts([
        {
          productType: "",
          customProductType: "",
          size: "",
          customSize: "",
          quantity: "",
          customQuantity: "",
          printColors: "",
        },
      ])
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-blue-600" />
            اطلب عرض سعر فوري
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* المعلومات الأساسية */}
          <div className="space-y-4 pb-4 border-b">
            <div className="space-y-2">
              <Label htmlFor="name">الاسم *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الجوال *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="01xxxxxxxxx"
                required
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceType">نوع الخدمة *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="طباعة">طباعة</SelectItem>
                  <SelectItem value="تصميم">تصميم</SelectItem>
                  <SelectItem value="حفر ليزر">حفر ليزر</SelectItem>
                  <SelectItem value="قص ليزر">قص ليزر</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">المنتجات</Label>
              <Button type="button" variant="outline" size="sm" onClick={addProduct} className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                إضافة منتج آخر
              </Button>
            </div>

            {products.map((product, index) => (
              <div key={index} className="space-y-4 p-4 bg-muted/30 rounded-lg relative">
                {products.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 h-6 w-6"
                    onClick={() => removeProduct(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}

                <div className="font-medium text-sm text-muted-foreground">المنتج {index + 1}</div>

                {/* نوع المنتج */}
                <div className="space-y-2">
                  <Label>نوع المنتج *</Label>
                  <Select
                    value={product.productType}
                    onValueChange={(value) => updateProduct(index, "productType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المنتج" />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* حقل النوع المخصص */}
                {product.productType === "نوع مخصص" && (
                  <div className="space-y-2">
                    <Label>اكتب نوع المنتج *</Label>
                    <Input
                      value={product.customProductType}
                      onChange={(e) => updateProduct(index, "customProductType", e.target.value)}
                      placeholder="مثال: لافتات، كتيبات، ملصقات..."
                      required
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {/* المقاس */}
                  <div className="space-y-2">
                    <Label>المقاس *</Label>
                    <Select
                      value={product.size}
                      onValueChange={(value) => updateProduct(index, "size", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="المقاس" />
                      </SelectTrigger>
                      <SelectContent>
                        {SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* الكمية */}
                  <div className="space-y-2">
                    <Label>الكمية *</Label>
                    <Select
                      value={product.quantity}
                      onValueChange={(value) => updateProduct(index, "quantity", value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="الكمية" />
                      </SelectTrigger>
                      <SelectContent>
                        {QUANTITIES.map((qty) => (
                          <SelectItem key={qty} value={qty}>
                            {qty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* حقل المقاس المخصص */}
                {product.size === "مقاس مخصص" && (
                  <div className="space-y-2">
                    <Label>اكتب المقاس *</Label>
                    <Input
                      value={product.customSize}
                      onChange={(e) => updateProduct(index, "customSize", e.target.value)}
                      placeholder="مثال: 30x40 سم"
                      required
                    />
                  </div>
                )}

                {/* حقل الكمية المخصصة */}
                {product.quantity === "كمية مخصصة" && (
                  <div className="space-y-2">
                    <Label>اكتب الكمية *</Label>
                    <Input
                      type="number"
                      value={product.customQuantity}
                      onChange={(e) => updateProduct(index, "customQuantity", e.target.value)}
                      placeholder="مثال: 3000"
                      required
                    />
                  </div>
                )}

                {/* ألوان الطباعة */}
                <div className="space-y-2">
                  <Label>ألوان الطباعة *</Label>
                  <Select
                    value={product.printColors}
                    onValueChange={(value) => updateProduct(index, "printColors", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر عدد الألوان" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          {/* ملاحظات */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات (اختياري)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="أي تفاصيل إضافية..."
              rows={2}
            />
          </div>

          {/* زر الإرسال */}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 gap-2" size="lg" disabled={loading}>
            <MessageCircle className="h-5 w-5" />
            {loading ? "جاري الإرسال..." : "إرسال عبر واتساب"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">سيتم فتح واتساب مباشرة لإرسال طلبك</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
