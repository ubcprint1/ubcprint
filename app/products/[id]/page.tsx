"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { useCartStore, allProducts } from "@/lib/cart-store"
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Upload,
  Minus,
  Plus,
  Share2,
  ChevronLeft,
  Package,
  Clock,
  Award,
} from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const idParam = params.id as string
  
  const productId = Number(idParam)
  const product = allProducts.find((p) => p.id === productId)
  
  const { addItem, getTotalItems } = useCartStore()
  
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedPrintType, setSelectedPrintType] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [customDesign, setCustomDesign] = useState<File | null>(null)
  const [notes, setNotes] = useState("")
  const [addedToCart, setAddedToCart] = useState(false)

  // إذا كان الـ id ليس رقماً صحيحاً، لا نعرض شيء (سيتم التعامل معه من الصفحات الثابتة)
  if (isNaN(productId)) {
    return null
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        <WebsiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">المنتج غير موجود</h1>
          <Link href="/products">
            <Button>العودة للمنتجات</Button>
          </Link>
        </main>
        <WebsiteFooter />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      options: {
        size: selectedSize,
        color: selectedColor,
        printType: selectedPrintType,
        customDesign: !!customDesign,
      },
    }, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomDesign(e.target.files[0])
    }
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
              <ChevronLeft className="h-4 w-4" />
              <Link href="/products" className="hover:text-blue-600">المنتجات</Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-slate-900">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border">
                {product.badge && (
                  <Badge className={`absolute top-4 right-4 ${product.badgeColor} text-white z-10`}>
                    {product.badge}
                  </Badge>
                )}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <Package className="w-32 h-32 text-slate-400" />
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow hover:bg-slate-50">
                  <Heart className="h-5 w-5 text-slate-600" />
                </button>
                <button className="absolute bottom-4 left-4 p-2 bg-white rounded-full shadow hover:bg-slate-50">
                  <Share2 className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              
              {/* Thumbnail images */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white rounded-lg border-2 border-transparent hover:border-blue-500 cursor-pointer overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                      <Package className="w-8 h-8 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-300"}`}
                      />
                    ))}
                    <span className="text-sm font-medium mr-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-slate-500">({product.reviews} تقييم)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-blue-600">{product.price} ج.م</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-400 line-through">{product.originalPrice} ج.م</span>
                    <Badge className="bg-green-100 text-green-700">وفر {discount}%</Badge>
                  </>
                )}
              </div>

              {/* Options */}
              <div className="space-y-4 border-t border-b py-6">
                {/* Size */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">الحجم / الكمية</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedSize === size
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">اللون</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedColor === color
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Print Type */}
                {product.printTypes && product.printTypes.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">نوع الطباعة</Label>
                    <div className="flex flex-wrap gap-2">
                      {product.printTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setSelectedPrintType(type)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                            selectedPrintType === type
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Design */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">رفع التصميم (اختياري)</Label>
                  <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai,.psd"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="design-upload"
                    />
                    <label htmlFor="design-upload" className="cursor-pointer">
                      {customDesign ? (
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <Check className="h-5 w-5" />
                          <span>{customDesign.name}</span>
                        </div>
                      ) : (
                        <div className="text-slate-500">
                          <Upload className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">اضغط لرفع التصميم أو اسحبه هنا</p>
                          <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF, AI, PSD</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">الكمية</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(product.minOrder || 1, quantity - 1))}
                        className="p-3 hover:bg-slate-50 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(product.minOrder || 1, Number(e.target.value)))}
                        className="w-20 text-center border-0"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-3 hover:bg-slate-50 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="text-sm text-slate-500">الحد الأدنى: {product.minOrder} قطعة</span>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">ملاحظات إضافية</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي تفاصيل أو متطلبات خاصة..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-slate-600">الإجمالي:</span>
                  <span className="text-2xl font-bold text-blue-600">{(product.price * quantity).toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 h-14 text-lg"
                  onClick={handleBuyNow}
                >
                  اشتري الآن
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-14 text-lg bg-transparent"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5 ml-2" />
                      تمت الإضافة
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 ml-2" />
                      أضف للسلة
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <Truck className="h-6 w-6 mx-auto text-blue-600 mb-2" />
                  <p className="text-xs text-slate-600">{product.deliveryTime}</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <Shield className="h-6 w-6 mx-auto text-green-600 mb-2" />
                  <p className="text-xs text-slate-600">ضمان الجودة</p>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <RotateCcw className="h-6 w-6 mx-auto text-orange-600 mb-2" />
                  <p className="text-xs text-slate-600">استرجاع سهل</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Features */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                مميزات المنتج
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                معلومات التوصيل
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium">مدة التوصيل</p>
                    <p className="text-sm text-slate-600">{product.deliveryTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium">الحد الأدنى للطلب</p>
                    <p className="text-sm text-slate-600">{product.minOrder} قطعة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium">ضمان الجودة</p>
                    <p className="text-sm text-slate-600">إعادة الطباعة مجاناً في حالة وجود عيوب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
