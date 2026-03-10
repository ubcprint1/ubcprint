"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingCart, Upload, Plus, Minus, X, Star, Truck, Shield, Gift, Package, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"

// Product categories
const productCategories = [
  { id: "promo", name: "منتجات ترويجية", icon: Gift },
  { id: "imported", name: "منتجات مستوردة", icon: Package },
  { id: "medals", name: "ميداليات وجوائز", icon: Star },
  { id: "mugs", name: "مجات وأكواب", icon: Package },
]

const promoProducts = [
  // منتجات ترويجية
  {
    id: "pens",
    name: "أقلام دعائية",
    category: "promo",
    description: "أقلام بلاستيك ومعدن بطباعة الشعار",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 3,
    minQuantity: 50,
    options: ["بلاستيك عادي", "بلاستيك فاخر", "معدن", "معدن فاخر"],
  },
  {
    id: "bags",
    name: "شنط قماش",
    category: "promo",
    description: "شنط توت باج وشنط تسوق بطباعة كاملة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 15,
    minQuantity: 20,
    options: ["قطن طبيعي", "كانفاس", "نايلون", "جوت"],
  },
  {
    id: "notebooks",
    name: "دفاتر ونوتات",
    category: "promo",
    description: "دفاتر ملاحظات بغلاف مخصص",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 20,
    minQuantity: 25,
    options: ["A5 سلك", "A5 لاصق", "A4 سلك", "جيب صغير"],
  },
  {
    id: "lanyards",
    name: "حبال بطاقات",
    category: "promo",
    description: "حبال للبطاقات التعريفية بطباعة كاملة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 5,
    minQuantity: 50,
    options: ["بوليستر 1.5سم", "بوليستر 2سم", "نايلون", "ساتان"],
  },
  {
    id: "caps",
    name: "كابات وقبعات",
    category: "promo",
    description: "كابات قطن وبوليستر بتطريز أو طباعة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 30,
    minQuantity: 20,
    options: ["قطن عادي", "قطن فاخر", "بوليستر", "تراكر"],
  },
  {
    id: "calendars",
    name: "تقاويم ومفكرات",
    category: "promo",
    description: "تقاويم حائط ومكتب بتصميم مخصص",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 25,
    minQuantity: 25,
    options: ["حائط كبير", "مكتبي", "جيب", "مفكرة سنوية"],
  },
  // منتجات مستوردة
  {
    id: "usb",
    name: "فلاشات USB",
    category: "imported",
    description: "فلاشات ميموري بطباعة الشعار",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 35,
    minQuantity: 20,
    options: ["8GB", "16GB", "32GB", "64GB"],
  },
  {
    id: "powerbank",
    name: "باور بانك",
    category: "imported",
    description: "شواحن متنقلة بطباعة ليزر",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 80,
    minQuantity: 10,
    options: ["5000mAh", "10000mAh", "20000mAh"],
  },
  {
    id: "wireless-charger",
    name: "شاحن لاسلكي",
    category: "imported",
    description: "شواحن لاسلكية بطباعة الشعار",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 120,
    minQuantity: 10,
    options: ["دائري", "مربع", "ستاند", "سيارة"],
  },
  {
    id: "speaker",
    name: "سماعات بلوتوث",
    category: "imported",
    description: "سماعات محمولة بطباعة الشعار",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 150,
    minQuantity: 10,
    options: ["صغير", "متوسط", "كبير"],
  },
  {
    id: "earbuds",
    name: "سماعات أذن",
    category: "imported",
    description: "سماعات لاسلكية بعلبة مطبوعة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 180,
    minQuantity: 10,
    options: ["عادي", "ANC"],
  },
  {
    id: "mousepads",
    name: "ماوس باد",
    category: "imported",
    description: "ماوس باد بطباعة كاملة الألوان",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 18,
    minQuantity: 20,
    options: ["مستطيل صغير", "مستطيل كبير", "دائري", "مع مسند معصم"],
  },
  // ميداليات وجوائز
  {
    id: "keychains",
    name: "ميداليات مفاتيح",
    category: "medals",
    description: "ميداليات أكريليك ومعدن بأشكال مخصصة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 8,
    minQuantity: 25,
    options: ["أكريليك شفاف", "أكريليك ملون", "معدن فضي", "معدن ذهبي", "جلد"],
  },
  {
    id: "award-medals",
    name: "ميداليات تكريم",
    category: "medals",
    description: "ميداليات معدنية للجوائز والتكريم",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 25,
    minQuantity: 10,
    options: ["ذهبي", "فضي", "برونزي", "مخصص"],
  },
  {
    id: "trophies",
    name: "كؤوس وتروفيات",
    category: "medals",
    description: "كؤوس كريستال ومعدن للجوائز",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 80,
    minQuantity: 5,
    options: ["كريستال صغير", "كريستال كبير", "معدن", "خشب"],
  },
  {
    id: "plaques",
    name: "دروع تذكارية",
    category: "medals",
    description: "دروع خشب وكريستال بحفر ليزر",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 100,
    minQuantity: 5,
    options: ["خشب صغير", "خشب كبير", "كريستال", "أكريليك"],
  },
  {
    id: "pins",
    name: "بروش ودبابيس",
    category: "medals",
    description: "بروشات معدنية بتصميم مخصص",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 12,
    minQuantity: 50,
    options: ["طلاء ذهبي", "طلاء فضي", "مينا ملونة", "3D"],
  },
  // مجات وأكواب
  {
    id: "ceramic-mug",
    name: "مج سيراميك",
    category: "mugs",
    description: "مج سيراميك أبيض بطباعة كاملة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 25,
    minQuantity: 12,
    options: ["11 أونصة", "15 أونصة", "مع غطاء", "مع ملعقة"],
  },
  {
    id: "magic-mug",
    name: "مج سحري",
    category: "mugs",
    description: "مج يتغير لونه بالحرارة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 45,
    minQuantity: 12,
    options: ["أسود", "أزرق", "أحمر"],
  },
  {
    id: "travel-mug",
    name: "ترافل مج",
    category: "mugs",
    description: "مج للسفر حافظ للحرارة",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 65,
    minQuantity: 10,
    options: ["350ml", "450ml", "500ml"],
  },
  {
    id: "glass-mug",
    name: "مج زجاجي",
    category: "mugs",
    description: "مج زجاج شفاف بطباعة أو حفر",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 35,
    minQuantity: 12,
    options: ["شفاف عادي", "شفاف ملون", "مزدوج الجدار"],
  },
  {
    id: "bottle",
    name: "زجاجات مياه",
    category: "mugs",
    description: "زجاجات رياضية وستانلس ستيل",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 40,
    minQuantity: 20,
    options: ["بلاستيك 500ml", "بلاستيك 750ml", "ستانلس 500ml", "ستانلس 750ml"],
  },
  {
    id: "coasters",
    name: "قواعد أكواب",
    category: "mugs",
    description: "كوسترات خشب وأكريليك وفلين",
    image: "/placeholder.svg?height=200&width=200",
    basePrice: 10,
    minQuantity: 25,
    options: ["خشب MDF", "أكريليك", "فلين", "جلد صناعي"],
  },
]

interface OrderItem {
  id: string
  productId: string
  productName: string
  option: string
  quantity: number
  customDesign: File | null
  notes: string
  price: number
}

export default function PromoProductsPage() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [selectedOption, setSelectedOption] = useState("")
  const [quantity, setQuantity] = useState(25)
  const [notes, setNotes] = useState("")
  const [customDesign, setCustomDesign] = useState<File | null>(null)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [showOrderForm, setShowOrderForm] = useState(false)

  const currentProduct = promoProducts.find(p => p.id === selectedProduct)
  const filteredProducts = selectedCategory === "all" 
    ? promoProducts 
    : promoProducts.filter(p => p.category === selectedCategory)

  const calculateItemPrice = (product: typeof promoProducts[0], qty: number) => {
    let unitPrice = product.basePrice
    if (qty >= 100) unitPrice *= 0.85
    else if (qty >= 50) unitPrice *= 0.9
    else if (qty >= 25) unitPrice *= 0.95
    return Math.round(unitPrice * qty)
  }

  const addToOrder = () => {
    if (!currentProduct || !selectedOption) return
    
    const newItem: OrderItem = {
      id: Date.now().toString(),
      productId: currentProduct.id,
      productName: currentProduct.name,
      option: selectedOption,
      quantity,
      customDesign,
      notes,
      price: calculateItemPrice(currentProduct, quantity),
    }
    
    setOrderItems([...orderItems, newItem])
    setSelectedProduct(null)
    setSelectedOption("")
    setQuantity(25)
    setNotes("")
    setCustomDesign(null)
  }

  const removeFromOrder = (id: string) => {
    setOrderItems(orderItems.filter(item => item.id !== id))
  }

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0)

  const sendWhatsApp = () => {
    if (!customerName || !customerPhone || orderItems.length === 0) return

    let message = `*طلب منتجات ترويجية جديد*\n\n`
    message += `*بيانات العميل:*\n`
    message += `الاسم: ${customerName}\n`
    message += `الجوال: ${customerPhone}\n\n`
    message += `*المنتجات المطلوبة:*\n`
    
    orderItems.forEach((item, index) => {
      message += `\n${index + 1}. ${item.productName}\n`
      message += `   النوع: ${item.option}\n`
      message += `   الكمية: ${item.quantity}\n`
      message += `   السعر: ${item.price.toLocaleString()} ج.م\n`
      if (item.notes) message += `   ملاحظات: ${item.notes}\n`
      if (item.customDesign) message += `   تصميم مرفق: نعم\n`
    })
    
    message += `\n*الإجمالي التقديري: ${totalPrice.toLocaleString()} ج.م*`

    const whatsappUrl = `https://wa.me/201036930965?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <WebsiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white mb-4">هدايا دعائية مميزة</Badge>
          <h1 className="text-4xl font-bold mb-4">المنتجات الترويجية</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            اختر من تشكيلتنا الواسعة من المنتجات الدعائية لتعزيز علامتك التجارية
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-b py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Gift className="w-5 h-5 text-blue-600" />
              <span>منتجات متنوعة</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>توصيل لكل مصر</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>ضمان الجودة</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Star className="w-5 h-5 text-blue-600" />
              <span>طباعة احترافية</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              جميع المنتجات
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedProduct === product.id ? "ring-2 ring-blue-600" : ""
                }`}
                onClick={() => {
                  setSelectedProduct(product.id)
                  setSelectedOption("")
                  setQuantity(product.minQuantity)
                }}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-slate-100 rounded-lg mb-3 flex items-center justify-center">
                    <Gift className="w-16 h-16 text-slate-300" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-bold">من {product.basePrice} ج.م</span>
                    <Badge variant="outline" className="text-xs">
                      الحد الأدنى {product.minQuantity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Configuration Modal */}
      {selectedProduct && currentProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">{currentProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Option Selection */}
                <div>
                  <Label className="mb-2 block">اختر النوع *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {currentProduct.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          selectedOption === option
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <Label className="mb-2 block">الكمية * (الحد الأدنى: {currentProduct.minQuantity})</Label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(currentProduct.minQuantity, quantity - 10))}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-slate-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(currentProduct.minQuantity, parseInt(e.target.value) || currentProduct.minQuantity))}
                      className="w-24 text-center"
                      min={currentProduct.minQuantity}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 10)}
                      className="w-10 h-10 rounded-lg border flex items-center justify-center hover:bg-slate-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {quantity >= 100 && (
                    <p className="text-green-600 text-sm mt-1">خصم 15% للكميات من 100 قطعة</p>
                  )}
                  {quantity >= 50 && quantity < 100 && (
                    <p className="text-green-600 text-sm mt-1">خصم 10% للكميات من 50 قطعة</p>
                  )}
                </div>

                {/* Upload Design */}
                <div>
                  <Label className="mb-2 block">رفع التصميم (اختياري)</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*,.pdf,.ai,.psd"
                      onChange={(e) => setCustomDesign(e.target.files?.[0] || null)}
                      className="hidden"
                      id="design-upload"
                    />
                    <label htmlFor="design-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                      {customDesign ? (
                        <span className="text-blue-600">{customDesign.name}</span>
                      ) : (
                        <span className="text-slate-500 text-sm">اضغط لرفع الشعار أو التصميم</span>
                      )}
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label className="mb-2 block">ملاحظات إضافية</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي تفاصيل إضافية..."
                    rows={2}
                  />
                </div>

                {/* Price */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">السعر التقديري:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {calculateItemPrice(currentProduct, quantity).toLocaleString()} ج.م
                    </span>
                  </div>
                </div>

                {/* Add Button */}
                <Button
                  onClick={addToOrder}
                  disabled={!selectedOption}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة للطلب
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">إتمام الطلب</h2>
                <button onClick={() => setShowOrderForm(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                <h3 className="font-semibold text-slate-700">المنتجات المختارة:</h3>
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-slate-50 rounded-lg p-3">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-slate-500">{item.option} - {item.quantity} قطعة</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-blue-600">{item.price.toLocaleString()} ج.م</span>
                      <button onClick={() => removeFromOrder(item.id)} className="text-red-500 hover:text-red-700">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="font-bold">الإجمالي:</span>
                  <span className="text-xl font-bold text-blue-600">{totalPrice.toLocaleString()} ج.م</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">الاسم *</Label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">رقم الجوال *</Label>
                  <Input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                onClick={sendWhatsApp}
                disabled={!customerName || !customerPhone || orderItems.length === 0}
                className="w-full mt-6 bg-green-600 hover:bg-green-700"
              >
                <Phone className="w-4 h-4 ml-2" />
                إرسال عبر واتساب
              </Button>
            </div>
          </div>
        </div>
      )}

      <WebsiteFooter />
    </div>
  )
}
