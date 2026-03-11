"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Upload,
  X,
  Shirt,
  Plus,
  Minus,
  Check,
  ShoppingCart,
  MessageCircle,
  GraduationCap,
  Users,
  Dumbbell,
  Briefcase,
  Baby,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Trash2,
  ImageIcon,
} from "lucide-react"
import { useState, useRef } from "react"

interface DesignFile {
  id: string
  name: string
  size: string
  preview: string | null
}

interface OrderItem {
  category: string
  product: string
  color: string
  sizes: { [key: string]: number }
  printType: string
  printPositions: string[]
  designFile: DesignFile | null
  notes: string
}

export default function ApparelOrderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [currentItem, setCurrentItem] = useState<OrderItem>({
    category: "",
    product: "",
    color: "",
    sizes: {},
    printType: "",
    printPositions: [],
    designFile: null,
    notes: "",
  })
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Categories
  const categories = [
    { 
      id: "casual", 
      name: "ملابس كاجوال", 
      icon: Shirt, 
      description: "تيشيرتات، بولو، هوديز",
      color: "bg-blue-500"
    },
    { 
      id: "uniform", 
      name: "يونيفورم", 
      icon: Briefcase, 
      description: "زي موحد للشركات والمؤسسات",
      color: "bg-slate-600"
    },
    { 
      id: "graduation", 
      name: "ملابس تخرج", 
      icon: GraduationCap, 
      description: "روب تخرج، كاب، وشاح",
      color: "bg-purple-500"
    },
    { 
      id: "sports", 
      name: "ملابس رياضية", 
      icon: Dumbbell, 
      description: "تيشيرتات رياضية، شورتات، ترينج",
      color: "bg-green-500"
    },
    { 
      id: "team", 
      name: "ملابس فرق", 
      icon: Users, 
      description: "زي فرق رياضية ومجموعات",
      color: "bg-orange-500"
    },
    { 
      id: "kids", 
      name: "ملابس أطفال", 
      icon: Baby, 
      description: "تيشيرتات وملابس للأطفال",
      color: "bg-pink-500"
    },
  ]

  // Products by category
  const productsByCategory: { [key: string]: { id: string; name: string; price: number; description: string }[] } = {
    casual: [
      { id: "tshirt-cotton", name: "تيشيرت قطن", price: 85, description: "قطن مصري عالي الجودة 100%" },
      { id: "tshirt-dry", name: "تيشيرت دراي فيت", price: 95, description: "سريع الجفاف ومريح" },
      { id: "hoodie", name: "هودي", price: 180, description: "فليس دافئ ومريح مع كابتشو" },
      { id: "sweatshirt", name: "سويت شيرت", price: 150, description: "فليس بدون كابتشو" },
      { id: "longsleeve", name: "تيشيرت كم طويل", price: 100, description: "قطن مريح للشتاء" },
    ],
    uniform: [
      { id: "polo-uniform", name: "بولو يونيفورم", price: 130, description: "بولو رسمي مع شعار الشركة" },
      { id: "shirt-uniform", name: "قميص يونيفورم", price: 150, description: "قميص رسمي للشركات والمؤسسات" },
      { id: "tshirt-uniform", name: "تيشيرت يونيفورم", price: 85, description: "تيشيرت قطن بشعار الشركة" },
      { id: "hoodie-uniform", name: "هودي يونيفورم", price: 180, description: "هودي للموظفين مع الشعار" },
    ],
    graduation: [
      { id: "grad-gown", name: "روب تخرج", price: 250, description: "روب أكاديمي كامل بجودة عالية" },
      { id: "grad-cap", name: "كاب تخرج", price: 45, description: "قبعة التخرج التقليدية مع شرابة" },
      { id: "grad-stole", name: "وشاح تخرج", price: 80, description: "وشاح مطرز بالشعار والاسم" },
      { id: "grad-set", name: "طقم تخرج كامل", price: 350, description: "روب + كاب + وشاح بسعر مميز" },
    ],
    sports: [
      { id: "sport-tshirt", name: "تيشيرت رياضي", price: 90, description: "دراي فيت خفيف ومريح" },
      { id: "sport-shorts", name: "شورت رياضي", price: 70, description: "مريح للتمارين والرياضة" },
      { id: "sport-track", name: "بنطلون ترينج", price: 120, description: "ترينج رياضي مرن" },
      { id: "sport-set", name: "طقم رياضي كامل", price: 200, description: "تيشيرت + شورت" },
      { id: "sport-jacket", name: "جاكيت رياضي", price: 180, description: "جاكيت خفيف للإحماء" },
    ],
    team: [
      { id: "team-jersey", name: "جيرسي فريق", price: 120, description: "قميص فريق بأرقام وأسماء" },
      { id: "team-shorts", name: "شورت فريق", price: 80, description: "شورت مطابق للجيرسي" },
      { id: "team-tracksuit", name: "ترينج فريق", price: 250, description: "طقم تدريب كامل" },
      { id: "team-cap", name: "كاب الفريق", price: 50, description: "كاب مطرز بشعار الفريق" },
    ],
    kids: [
      { id: "kids-tshirt", name: "تيشيرت أطفال", price: 55, description: "قطن ناعم للأطفال" },
      { id: "kids-hoodie", name: "هودي أطفال", price: 120, description: "دافئ ومريح للصغار" },
      { id: "kids-polo", name: "بولو أطفال", price: 80, description: "أنيق للمدرسة والمناسبات" },
    ],
  }

  // Colors
  const colors = [
    { id: "white", name: "أبيض", hex: "#FFFFFF" },
    { id: "black", name: "أسود", hex: "#1a1a1a" },
    { id: "navy", name: "كحلي", hex: "#1e3a5f" },
    { id: "red", name: "أحمر", hex: "#dc2626" },
    { id: "green", name: "أخضر", hex: "#16a34a" },
    { id: "gray", name: "رمادي", hex: "#6b7280" },
    { id: "blue", name: "أزرق", hex: "#2563eb" },
    { id: "yellow", name: "أصفر", hex: "#eab308" },
    { id: "maroon", name: "عنابي", hex: "#7f1d1d" },
    { id: "purple", name: "بنفسجي", hex: "#7c3aed" },
    { id: "orange", name: "برتقالي", hex: "#ea580c" },
    { id: "pink", name: "وردي", hex: "#ec4899" },
  ]

  // Sizes by category
  const sizesByCategory: { [key: string]: string[] } = {
    casual: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    uniform: ["S", "M", "L", "XL", "XXL", "3XL", "4XL"],
    graduation: ["S", "M", "L", "XL", "XXL"],
    sports: ["XS", "S", "M", "L", "XL", "XXL"],
    team: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    kids: ["4-5 سنوات", "6-7 سنوات", "8-9 سنوات", "10-11 سنوات", "12-13 سنوات", "14-15 سنوات"],
  }

  // Print types
  const printTypes = [
    { id: "dtf", name: "طباعة DTF", description: "جودة عالية وألوان غير محدودة", price: 0, recommended: true },
    { id: "screen", name: "سلك سكرين", description: "مثالي للكميات الكبيرة", price: 0 },
    { id: "embroidery", name: "تطريز", description: "مظهر فاخر ومتين", price: 15 },
    { id: "vinyl", name: "فينيل حراري", description: "للتصاميم البسيطة", price: 0 },
    { id: "sublimation", name: "سبليميشن", description: "طباعة كاملة على البوليستر", price: 10 },
  ]

  // Print positions
  const printPositions = [
    { id: "front-center", name: "الصدر (وسط)", icon: "⬛" },
    { id: "front-left", name: "الصدر (يسار)", icon: "◀" },
    { id: "front-right", name: "الصدر (يمين)", icon: "▶" },
    { id: "back-full", name: "الظهر كامل", icon: "⬜" },
    { id: "back-top", name: "أعلى الظهر", icon: "🔼" },
    { id: "sleeve-left", name: "الكم الأيسر", icon: "←" },
    { id: "sleeve-right", name: "الكم الأيمن", icon: "→" },
  ]

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentItem({ ...currentItem, category: categoryId, product: "", sizes: {} })
    setCurrentStep(2)
  }

  const handleProductSelect = (productId: string) => {
    setCurrentItem({ ...currentItem, product: productId })
  }

  const handleColorSelect = (colorId: string) => {
    setCurrentItem({ ...currentItem, color: colorId })
  }

  const handleSizeChange = (size: string, quantity: number) => {
    const newSizes = { ...currentItem.sizes }
    if (quantity <= 0) {
      delete newSizes[size]
    } else {
      newSizes[size] = quantity
    }
    setCurrentItem({ ...currentItem, sizes: newSizes })
  }

  const handlePrintTypeSelect = (printTypeId: string) => {
    setCurrentItem({ ...currentItem, printType: printTypeId })
  }

  const togglePrintPosition = (positionId: string) => {
    const positions = currentItem.printPositions.includes(positionId)
      ? currentItem.printPositions.filter(p => p !== positionId)
      : [...currentItem.printPositions, positionId]
    setCurrentItem({ ...currentItem, printPositions: positions })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentItem({
          ...currentItem,
          designFile: {
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + " MB",
            preview: reader.result as string,
          },
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = () => {
    setCurrentItem({ ...currentItem, designFile: null })
  }

  const addToOrder = () => {
    if (currentItem.product && currentItem.color && Object.keys(currentItem.sizes).length > 0) {
      setOrderItems([...orderItems, currentItem])
      setCurrentItem({
        category: "",
        product: "",
        color: "",
        sizes: {},
        printType: "",
        printPositions: [],
        designFile: null,
        notes: "",
      })
      setSelectedCategory(null)
      setCurrentStep(1)
    }
  }

  const removeFromOrder = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index))
  }

  const getTotalQuantity = () => {
    let total = 0
    orderItems.forEach(item => {
      Object.values(item.sizes).forEach(qty => {
        total += qty
      })
    })
    Object.values(currentItem.sizes).forEach(qty => {
      total += qty
    })
    return total
  }

  const getEstimatedTotal = () => {
    let total = 0
    orderItems.forEach(item => {
      const product = Object.values(productsByCategory).flat().find(p => p.id === item.product)
      const printType = printTypes.find(p => p.id === item.printType)
      if (product) {
        const qty = Object.values(item.sizes).reduce((a, b) => a + b, 0)
        total += (product.price + (printType?.price || 0)) * qty
      }
    })
    return total
  }

  const sendToWhatsApp = () => {
    let message = `مرحباً، أريد طلب ملابس مخصصة:\n\n`
    message += `👤 معلومات العميل:\n`
    message += `- الاسم: ${customerInfo.name}\n`
    message += `- الهاتف: ${customerInfo.phone}\n`
    if (customerInfo.email) message += `- البريد: ${customerInfo.email}\n`
    if (customerInfo.company) message += `- الشركة: ${customerInfo.company}\n`
    message += `\n📦 تفاصيل الطلب:\n`

    orderItems.forEach((item, index) => {
      const category = categories.find(c => c.id === item.category)
      const product = Object.values(productsByCategory).flat().find(p => p.id === item.product)
      const color = colors.find(c => c.id === item.color)
      const printType = printTypes.find(p => p.id === item.printType)

      message += `\n${index + 1}. ${product?.name} (${category?.name})\n`
      message += `   - اللون: ${color?.name}\n`
      message += `   - المقاسات: ${Object.entries(item.sizes).map(([s, q]) => `${s}(${q})`).join(", ")}\n`
      if (printType) message += `   - نوع الطباعة: ${printType.name}\n`
      if (item.printPositions.length > 0) {
        const posNames = item.printPositions.map(p => printPositions.find(pp => pp.id === p)?.name).join(", ")
        message += `   - مواقع الطباعة: ${posNames}\n`
      }
      if (item.designFile) message += `   - تم رفع تصميم: ${item.designFile.name}\n`
      if (item.notes) message += `   - ملاحظات: ${item.notes}\n`
    })

    message += `\n💰 الإجمالي التقديري: ${getEstimatedTotal()} ج.م`
    message += `\n📊 إجمالي القطع: ${getTotalQuantity()} قطعة`

    window.open(`https://wa.me/201036930965?text=${encodeURIComponent(message)}`, "_blank")
  }

  const currentSizes = selectedCategory ? sizesByCategory[selectedCategory] || sizesByCategory.casual : []
  const currentProducts = selectedCategory ? productsByCategory[selectedCategory] || [] : []

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-white/20 text-white mb-4">تصميم وطباعة احترافية</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">اطلب ملابسك المخصصة</h1>
            <p className="text-blue-100 text-lg">
              تيشيرتات، يونيفورم، ملابس تخرج، ملابس رياضية وأكثر - مع طباعة تصميمك الخاص
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[
              { num: 1, label: "اختر الفئة" },
              { num: 2, label: "اختر المنتج" },
              { num: 3, label: "التخصيص" },
              { num: 4, label: "التصميم" },
              { num: 5, label: "إرسال الطلب" },
            ].map((step, index) => (
              <React.Fragment key={step.num}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step.num
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > step.num ? <Check className="h-4 w-4" /> : step.num}
                  </div>
                  <span className="text-xs mt-1 hidden md:block text-slate-600">{step.label}</span>
                </div>
                {index < 4 && (
                  <div className={`h-0.5 w-8 md:w-16 ${currentStep > step.num ? "bg-blue-600" : "bg-slate-200"}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Step 1: Select Category */}
              {currentStep === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Shirt className="h-6 w-6 text-blue-600" />
                      1. اختر نوع الملابس
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`p-4 rounded-xl border-2 transition-all text-center hover:shadow-md ${
                            selectedCategory === cat.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <div className={`w-12 h-12 ${cat.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                            <cat.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-slate-900 mb-1">{cat.name}</h3>
                          <p className="text-xs text-slate-500">{cat.description}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Select Product */}
              {currentStep === 2 && selectedCategory && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                        2. اختر المنتج
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                        <ChevronRight className="h-4 w-4 ml-1" />
                        رجوع
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {currentProducts.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            handleProductSelect(product.id)
                            setCurrentStep(3)
                          }}
                          className={`p-4 rounded-xl border-2 transition-all text-right hover:shadow-md ${
                            currentItem.product === product.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Shirt className="h-8 w-8 text-slate-400" />
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm mb-1">{product.name}</h3>
                          <p className="text-xs text-slate-500 mb-2">{product.description}</p>
                          <p className="text-blue-600 font-bold">{product.price} ج.م</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Customization (Color & Size) */}
              {currentStep === 3 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-blue-600" />
                        3. اختر اللون والمقاس
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>
                        <ChevronRight className="h-4 w-4 ml-1" />
                        رجوع
                      </Button>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-3 block">اختر اللون</Label>
                      <div className="flex flex-wrap gap-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            onClick={() => handleColorSelect(color.id)}
                            className={`group relative`}
                            title={color.name}
                          >
                            <div
                              className={`w-10 h-10 rounded-full border-2 transition-all ${
                                currentItem.color === color.id
                                  ? "border-blue-500 ring-2 ring-blue-200"
                                  : "border-slate-300 hover:border-slate-400"
                              }`}
                              style={{ backgroundColor: color.hex }}
                            >
                              {currentItem.color === color.id && (
                                <Check className={`h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                                  color.id === "white" || color.id === "yellow" ? "text-slate-800" : "text-white"
                                }`} />
                              )}
                            </div>
                            <span className="text-xs text-slate-600 mt-1 block text-center">{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">اختر المقاسات والكميات</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                        {currentSizes.map((size) => (
                          <div key={size} className="text-center">
                            <div
                              className={`p-2 rounded-lg border-2 mb-2 ${
                                currentItem.sizes[size]
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-slate-200"
                              }`}
                            >
                              <span className="font-bold text-sm">{size}</span>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => handleSizeChange(size, (currentItem.sizes[size] || 0) - 1)}
                                className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center font-medium text-sm">
                                {currentItem.sizes[size] || 0}
                              </span>
                              <button
                                onClick={() => handleSizeChange(size, (currentItem.sizes[size] || 0) + 1)}
                                className="w-7 h-7 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => setCurrentStep(4)}
                      disabled={!currentItem.color || Object.keys(currentItem.sizes).length === 0}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      التالي: إضافة التصميم
                      <ChevronLeft className="h-4 w-4 mr-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 4: Design Upload */}
              {currentStep === 4 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <ImageIcon className="h-6 w-6 text-blue-600" />
                        4. أضف تصميمك
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(3)}>
                        <ChevronRight className="h-4 w-4 ml-1" />
                        رجوع
                      </Button>
                    </div>

                    {/* Print Type Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-3 block">نوع الطباعة</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {printTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handlePrintTypeSelect(type.id)}
                            className={`p-4 rounded-xl border-2 transition-all text-right ${
                              currentItem.printType === type.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                                  {type.name}
                                  {type.recommended && (
                                    <Badge className="bg-green-100 text-green-700 text-xs">موصى به</Badge>
                                  )}
                                </h4>
                                <p className="text-sm text-slate-500 mt-1">{type.description}</p>
                              </div>
                              {type.price > 0 && (
                                <span className="text-blue-600 font-bold text-sm">+{type.price} ج.م</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Print Position Selection */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-3 block">مواقع الطباعة (يمكن اختيار أكثر من موقع)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {printPositions.map((pos) => (
                          <button
                            key={pos.id}
                            onClick={() => togglePrintPosition(pos.id)}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              currentItem.printPositions.includes(pos.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-blue-300"
                            }`}
                          >
                            <span className="text-2xl mb-1 block">{pos.icon}</span>
                            <span className="text-sm font-medium">{pos.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="mb-8">
                      <Label className="text-base font-semibold mb-3 block">ارفع تصميمك (اختياري)</Label>
                      {!currentItem.designFile ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
                        >
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600 font-medium mb-2">اضغط لرفع التصميم أو اسحب الملف هنا</p>
                          <p className="text-sm text-slate-400">PNG, JPG, PDF, AI - حتى 25MB</p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*,.pdf,.ai"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </div>
                      ) : (
                        <div className="border-2 border-green-300 bg-green-50 rounded-xl p-4">
                          <div className="flex items-center gap-4">
                            {currentItem.designFile.preview && (
                              <img
                                src={currentItem.designFile.preview || "/placeholder.svg"}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-slate-900">{currentItem.designFile.name}</p>
                              <p className="text-sm text-slate-500">{currentItem.designFile.size}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={removeFile}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                      <p className="text-sm text-slate-500 mt-2">
                        يمكنك ترك هذا الحقل فارغاً وسيتواصل معك فريقنا لتصميم مخصص
                      </p>
                    </div>

                    {/* Notes */}
                    <div className="mb-6">
                      <Label className="text-base font-semibold mb-3 block">ملاحظات إضافية</Label>
                      <Textarea
                        placeholder="أي تفاصيل إضافية عن التصميم أو الطباعة..."
                        value={currentItem.notes}
                        onChange={(e) => setCurrentItem({ ...currentItem, notes: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={addToOrder}
                        disabled={!currentItem.product || !currentItem.color || Object.keys(currentItem.sizes).length === 0}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة للطلب
                      </Button>
                      {orderItems.length > 0 && (
                        <Button onClick={() => setCurrentStep(5)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                          متابعة الطلب
                          <ChevronLeft className="h-4 w-4 mr-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 5: Customer Info & Submit */}
              {currentStep === 5 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 text-blue-600" />
                        5. معلومات التواصل
                      </h2>
                      <Button variant="ghost" size="sm" onClick={() => setCurrentStep(4)}>
                        <ChevronRight className="h-4 w-4 ml-1" />
                        رجوع
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label htmlFor="name">الاسم *</Label>
                        <Input
                          id="name"
                          placeholder="اسمك الكامل"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          placeholder="01xxxxxxxxx"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">اسم الشركة / المؤسسة</Label>
                        <Input
                          id="company"
                          placeholder="اختياري"
                          value={customerInfo.company}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={sendToWhatsApp}
                      disabled={!customerInfo.name || !customerInfo.phone || orderItems.length === 0}
                      className="w-full bg-green-600 hover:bg-green-700 h-14 text-lg"
                    >
                      <MessageCircle className="h-5 w-5 ml-2" />
                      إرسال الطلب عبر واتساب
                    </Button>
                    <p className="text-center text-sm text-slate-500 mt-3">
                      سيتم فتح واتساب لإرسال تفاصيل طلبك مباشرة
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-36">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-blue-600" />
                      ملخص الطلب
                    </h3>

                    {orderItems.length === 0 && Object.keys(currentItem.sizes).length === 0 ? (
                      <div className="text-center py-8 text-slate-500">
                        <Shirt className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                        <p>لم تضف أي منتجات بعد</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orderItems.map((item, index) => {
                          const category = categories.find(c => c.id === item.category)
                          const product = Object.values(productsByCategory).flat().find(p => p.id === item.product)
                          const color = colors.find(c => c.id === item.color)
                          const qty = Object.values(item.sizes).reduce((a, b) => a + b, 0)

                          return (
                            <div key={index} className="bg-slate-50 rounded-lg p-3">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-medium text-slate-900">{product?.name}</p>
                                  <p className="text-xs text-slate-500">{category?.name}</p>
                                </div>
                                <button
                                  onClick={() => removeFromOrder(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: colors.find(c => c.id === item.color)?.hex }}
                                />
                                <span>{color?.name}</span>
                                <span>•</span>
                                <span>{qty} قطعة</span>
                              </div>
                              {item.designFile && (
                                <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                                  <Check className="h-3 w-3" />
                                  تم رفع تصميم
                                </div>
                              )}
                            </div>
                          )
                        })}

                        {/* Current item preview */}
                        {currentItem.product && Object.keys(currentItem.sizes).length > 0 && (
                          <div className="bg-blue-50 rounded-lg p-3 border-2 border-blue-200 border-dashed">
                            <p className="text-xs text-blue-600 mb-1">المنتج الحالي</p>
                            <p className="font-medium text-slate-900">
                              {Object.values(productsByCategory).flat().find(p => p.id === currentItem.product)?.name}
                            </p>
                            {currentItem.color && (
                              <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                                <div
                                  className="w-4 h-4 rounded-full border"
                                  style={{ backgroundColor: colors.find(c => c.id === currentItem.color)?.hex }}
                                />
                                <span>{colors.find(c => c.id === currentItem.color)?.name}</span>
                                <span>•</span>
                                <span>{Object.values(currentItem.sizes).reduce((a, b) => a + b, 0)} قطعة</span>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">إجمالي القطع</span>
                            <span className="font-medium">{getTotalQuantity()} قطعة</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>الإجمالي التقديري</span>
                            <span className="text-blue-600">{getEstimatedTotal()} ج.م</span>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">
                            * السعر النهائي يحدد بعد مراجعة التصميم
                          </p>
                        </div>

                        {orderItems.length > 0 && currentStep < 5 && (
                          <Button
                            onClick={() => setCurrentStep(5)}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            إتمام الطلب
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">تحتاج مساعدة؟</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      فريقنا جاهز لمساعدتك في اختيار المنتج المناسب وتصميمه
                    </p>
                    <a href="https://wa.me/201036930965" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        <MessageCircle className="h-4 w-4 ml-2" />
                        تواصل معنا
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
