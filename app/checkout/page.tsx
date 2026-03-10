"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { useCartStore } from "@/lib/cart-store"
import { useOrdersStore } from "@/lib/orders-store"
import { useClientAuth } from "@/lib/client-auth-store"
import {
  ChevronLeft,
  Check,
  CreditCard,
  Banknote,
  Truck,
  MapPin,
  User,
  Phone,
  Mail,
  Package,
  Shield,
  ArrowRight,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
} from "lucide-react"

type CheckoutStep = "cart" | "shipping" | "payment" | "confirmation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, removeItem, updateQuantity, clearCart } = useCartStore()
  const addOrder = useOrdersStore((state) => state.addOrder)
  const { user, isLoggedIn } = useClientAuth()
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const steps = [
    { id: "cart", name: "سلة المشتريات", icon: ShoppingBag },
    { id: "shipping", name: "معلومات الشحن", icon: Truck },
    { id: "payment", name: "الدفع", icon: CreditCard },
    { id: "confirmation", name: "تأكيد الطلب", icon: Check },
  ]

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + shipping

  const handleNextStep = () => {
    if (currentStep === "cart") setCurrentStep("shipping")
    else if (currentStep === "shipping") {
      // التحقق من تسجيل الدخول قبل الانتقال للدفع
      if (!isLoggedIn) {
        setShowLoginPrompt(true)
        return
      }
      setCurrentStep("payment")
    }
    else if (currentStep === "payment") handlePlaceOrder()
  }

  const handlePrevStep = () => {
    if (currentStep === "shipping") setCurrentStep("cart")
    else if (currentStep === "payment") setCurrentStep("shipping")
    else if (currentStep === "confirmation") setCurrentStep("payment")
  }

  const handlePlaceOrder = () => {
    // Create order in the employee orders system
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7) // Expected delivery in 7 days

    const paymentLabel = paymentMethod === "cash" ? "الدفع عند الاستلام" : paymentMethod === "card" ? "بطاقة ائتمان" : "تحويل بنكي / InstaPay"

    const orderProducts = items.map((item) => ({
      productName: item.name,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      notes: [
        item.options?.size ? `الحجم: ${item.options.size}` : "",
        item.options?.color ? `اللون: ${item.options.color}` : "",
        item.options?.printType ? `الطباعة: ${item.options.printType}` : "",
      ].filter(Boolean).join(" | "),
      stages: [
        { stage: "design" as const, assignedTo: "", notes: "" },
        { stage: "production" as const, assignedTo: "", notes: "" },
        { stage: "quality" as const, assignedTo: "", notes: "" },
        { stage: "packaging" as const, assignedTo: "", notes: "" },
        { stage: "delivery" as const, assignedTo: "", notes: "" },
      ],
    }))

const newOrder = addOrder({
  customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
  customerEmail: user?.email || shippingInfo.email,
  customerPhone: shippingInfo.phone,
  customerId: user?.id,
  description: `طلب من الموقع - هاتف: ${shippingInfo.phone} - العنوان: ${shippingInfo.address}, ${shippingInfo.area}, ${shippingInfo.city} - طريقة الدفع: ${paymentLabel}${shippingInfo.notes ? ` - ملاحظات: ${shippingInfo.notes}` : ""}`,
  priority: total >= 5000 ? "high" : total >= 1000 ? "medium" : "low",
  paidAmount: paymentMethod === "cash" ? 0 : total,
  deliveryDate: deliveryDate.toISOString(),
  products: orderProducts,
  totalCost: total,
  })

    setOrderId(newOrder.orderNumber)
    setCurrentStep("confirmation")
    setOrderPlaced(true)
    
    // Send WhatsApp notification with real order number
    const message = `طلب جديد #${newOrder.orderNumber}
    
الاسم: ${shippingInfo.firstName} ${shippingInfo.lastName}
الهاتف: ${shippingInfo.phone}
البريد: ${shippingInfo.email}
العنوان: ${shippingInfo.address}, ${shippingInfo.area}, ${shippingInfo.city}

المنتجات:
${items.map(item => `- ${item.name} x${item.quantity} = ${item.price * item.quantity} ج.م`).join('\n')}

الإجمالي: ${total} ج.م
طريقة الدفع: ${paymentLabel}
ملاحظات: ${shippingInfo.notes || 'لا يوجد'}`

    window.open(`https://wa.me/201036930965?text=${encodeURIComponent(message)}`, "_blank")
    
    // Clear cart after order
    setTimeout(() => clearCart(), 1000)
  }

  const isStepComplete = (step: CheckoutStep) => {
    const stepOrder = ["cart", "shipping", "payment", "confirmation"]
    return stepOrder.indexOf(step) < stepOrder.indexOf(currentStep)
  }

  const isCurrentStep = (step: CheckoutStep) => currentStep === step

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
        <WebsiteHeader />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">السلة فارغة</h1>
          <p className="text-slate-600 mb-8">لم تقم بإضافة أي منتجات بعد</p>
          <Link href="/products">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              تصفح المنتجات
            </Button>
          </Link>
        </main>
        <WebsiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      <main className="flex-1">
        {/* Progress Steps */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center">
              {steps.map((step, idx) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isStepComplete(step.id as CheckoutStep)
                          ? "bg-green-500 text-white"
                          : isCurrentStep(step.id as CheckoutStep)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isStepComplete(step.id as CheckoutStep) ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`hidden sm:block text-sm font-medium ${
                        isCurrentStep(step.id as CheckoutStep)
                          ? "text-blue-600"
                          : isStepComplete(step.id as CheckoutStep)
                          ? "text-green-600"
                          : "text-slate-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-24 h-1 mx-2 rounded ${
                        isStepComplete(steps[idx + 1].id as CheckoutStep)
                          ? "bg-green-500"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Cart Review */}
              {currentStep === "cart" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">مراجعة سلة المشتريات</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-10 h-10 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.options && (
                            <div className="text-sm text-slate-500 mt-1">
                              {item.options.size && <span>الحجم: {item.options.size} | </span>}
                              {item.options.color && <span>اللون: {item.options.color} | </span>}
                              {item.options.printType && <span>الطباعة: {item.options.printType}</span>}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 border rounded hover:bg-slate-50"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 border rounded hover:bg-slate-50"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-bold text-blue-600">
                                {(item.price * item.quantity).toLocaleString()} ج.م
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-6 pt-6 border-t">
                    <Link href="/products">
                      <Button variant="outline">
                        <ArrowRight className="w-4 h-4 ml-2" />
                        متابعة التسوق
                      </Button>
                    </Link>
                    <Button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700">
                      متابعة للشحن
                      <ChevronLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === "shipping" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">معلومات الشحن</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        placeholder="أحمد"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">اسم العائلة *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        placeholder="محمد"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        placeholder="01036930965"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        placeholder="example@email.com"
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">العنوان بالتفصيل *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        placeholder="رقم المبنى، اسم الشارع، علامة مميزة"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">المحافظة *</Label>
                      <select
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full mt-1 p-2 border rounded-lg"
                      >
                        <option value="">اختر المحافظة</option>
                        <option value="القاهرة">القاهرة</option>
                        <option value="الجيزة">الجيزة</option>
                        <option value="الإسكندرية">الإسكندرية</option>
                        <option value="الشرقية">الشرقية</option>
                        <option value="المنوفية">المنوفية</option>
                        <option value="القليوبية">القليوبية</option>
                        <option value="البحيرة">البحيرة</option>
                        <option value="الغربية">الغربية</option>
                        <option value="كفر الشيخ">كفر الشيخ</option>
                        <option value="دمياط">دمياط</option>
                        <option value="الدقهلية">الدقهلية</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="area">المنطقة *</Label>
                      <Input
                        id="area"
                        value={shippingInfo.area}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, area: e.target.value })}
                        placeholder="مدينة نصر، المهندسين..."
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="notes">ملاحظات للتوصيل</Label>
                      <Textarea
                        id="notes"
                        value={shippingInfo.notes}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, notes: e.target.value })}
                        placeholder="تعليمات إضا����ية للتوصيل..."
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6 pt-6 border-t">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowRight className="w-4 h-4 ml-2" />
                      العودة للسلة
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.phone || !shippingInfo.address || !shippingInfo.city}
                    >
                      متابعة للدفع
                      <ChevronLeft className="w-4 h-4 mr-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === "payment" && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-6">طريقة الدفع</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "cash" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                      }`}
                      onClick={() => setPaymentMethod("cash")}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cash" id="cash" />
                        <Banknote className="w-6 h-6 text-green-600" />
                        <div>
                          <Label htmlFor="cash" className="font-medium cursor-pointer">
                            الدفع عند الاستلام
                          </Label>
                          <p className="text-sm text-slate-500">ادفع نقداً عند استلام طلبك</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "card" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        <div>
                          <Label htmlFor="card" className="font-medium cursor-pointer">
                            بطاقة ائتمان / خصم
                          </Label>
                          <p className="text-sm text-slate-500">Visa, Mastercard, Meeza</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "instapay" ? "border-blue-600 bg-blue-50" : "border-slate-200"
                      }`}
                      onClick={() => setPaymentMethod("instapay")}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="instapay" id="instapay" />
                        <Phone className="w-6 h-6 text-purple-600" />
                        <div>
                          <Label htmlFor="instapay" className="font-medium cursor-pointer">
                            تحويل بنكي / InstaPay
                          </Label>
                          <p className="text-sm text-slate-500">حوّل المبلغ وأرسل الإيصال</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <div className="grid gap-4">
                        <div>
                          <Label>رقم البطاقة</Label>
                          <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>تاريخ الانتهاء</Label>
                            <Input placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label>CVV</Label>
                            <Input placeholder="123" className="mt-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "instapay" && (
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>تعليمات التحويل:</strong><br />
                        حوّل المبلغ إلى: 01036930965<br />
                        اسم الحساب: UBC Print<br />
                        ثم أرسل صورة الإيصال عبر واتساب
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex items-start gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                      أوافق على <Link href="/terms" className="text-blue-600 hover:underline">الشروط والأحكام</Link> و
                      <Link href="/privacy" className="text-blue-600 hover:underline"> سياسة الخصوصية</Link>
                    </Label>
                  </div>

                  <div className="flex justify-between mt-6 pt-6 border-t">
                    <Button variant="outline" onClick={handlePrevStep}>
                      <ArrowRight className="w-4 h-4 ml-2" />
                      العودة
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!agreeToTerms}
                    >
                      <Check className="w-4 h-4 ml-2" />
                      تأكيد الطلب
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === "confirmation" && (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-600 mb-2">تم استلام طلبك بنجاح!</h2>
                  <p className="text-slate-600 mb-6">
                    رقم الطلب: <span className="font-bold text-slate-900">{orderId}</span>
                  </p>
                  <div className="bg-slate-50 rounded-lg p-4 mb-6 text-right">
                    <h3 className="font-medium mb-2">معلومات التوصيل:</h3>
                    <p className="text-sm text-slate-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.phone}<br />
                      {shippingInfo.address}, {shippingInfo.area}, {shippingInfo.city}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/">
                      <Button variant="outline" size="lg">
                        العودة للرئيسية
                      </Button>
                    </Link>
                    <Link href={`/track-order?orderNumber=${orderId}`}>
                      <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                        <Package className="w-4 h-4 ml-2" />
                        متابعة الطلب
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                        متابعة التسوق
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {currentStep !== "confirmation" && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">ملخص الطلب</h3>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          {item.name} <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span>{(item.price * item.quantity).toLocaleString()} ج.م</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">المجموع الفرعي</span>
                      <span>{subtotal.toLocaleString()} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">الشحن</span>
                      <span>{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span>
                    </div>
                    {subtotal < 500 && (
                      <p className="text-xs text-blue-600">
                        أضف {(500 - subtotal).toLocaleString()} ج.م للشحن المجاني
                      </p>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                      <span>الإجمالي</span>
                      <span className="text-blue-600">{total.toLocaleString()} ج.م</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>دفع آمن 100%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span>توصيل خلال 3-7 أيام</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* نافذة تسجيل الدخول */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLoginPrompt(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h3>
            <p className="text-slate-600 mb-6">
              يجب تسجيل الدخول لإتمام عملية الشراء ومتابعة طلباتك
            </p>
            <div className="space-y-3">
              <Link href={`/client/login?redirect=/checkout`}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href={`/client/register?redirect=/checkout`}>
                <Button variant="outline" className="w-full">
                  إنشاء حساب جديد
                </Button>
              </Link>
              <Button variant="ghost" className="w-full text-slate-500" onClick={() => setShowLoginPrompt(false)}>
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      <WebsiteFooter />
    </div>
  )
}
