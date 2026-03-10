"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { useOrdersStore } from "@/lib/orders-store"
import { useClientAuth } from "@/lib/client-auth-store"
import type { OrderStage } from "@/lib/orders-types"
import {
  Search,
  Package,
  Palette,
  Settings,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Home,
  RefreshCw,
  User,
  LogIn,
} from "lucide-react"

// تحويل مراحل النظام الداخلي إلى مراحل مبسطة للعميل
type CustomerStage = "design" | "preparing" | "ready" | "shipped" | "delivered"

interface CustomerStageConfig {
  label: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
}

const CUSTOMER_STAGES: Record<CustomerStage, CustomerStageConfig> = {
  design: {
    label: "جاري التصميم",
    description: "يتم العمل على تصميم طلبك حسب المواصفات المطلوبة",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  preparing: {
    label: "جاري تجهيز الطلب",
    description: "يتم طباعة وتجهيز طلبك في قسم الإنتاج",
    icon: Settings,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  ready: {
    label: "جاري تجهيز الطلب للتسليم",
    description: "تم الانتهاء من طلبك ويتم تغليفه للشحن",
    icon: Package,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  shipped: {
    label: "تم شحن الطلب",
    description: "طلبك في الطريق إليك",
    icon: Truck,
    color: "text-cyan-600",
    bgColor: "bg-cyan-100",
  },
  delivered: {
    label: "تم استلام الطلب",
    description: "تم تسليم طلبك بنجاح - شكراً لتعاملك معنا",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
}

// تحويل مرحلة النظام الداخلي إلى مرحلة العميل
function mapInternalStageToCustomerStage(internalStage: OrderStage): CustomerStage {
  switch (internalStage) {
    case "new":
    case "design":
    case "approval":
      return "design"
    case "production":
    case "quality":
      return "preparing"
    case "packaging":
      return "ready"
    case "delivery":
      return "shipped"
    case "completed":
      return "delivered"
    case "cancelled":
      return "design" // fallback
    default:
      return "design"
  }
}

const CUSTOMER_STAGES_ORDER: CustomerStage[] = ["design", "preparing", "ready", "shipped", "delivered"]

export default function TrackOrderPage() {
  const searchParams = useSearchParams()
  const orders = useOrdersStore((state) => state.orders)
  const { user, isLoggedIn } = useClientAuth()
  
  const [orderNumber, setOrderNumber] = useState("")
  const [searchedOrder, setSearchedOrder] = useState<typeof orders[number] | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // طلبات المستخدم الحالي (حسب الاسم أو البريد)
  const userOrders = isLoggedIn && user
    ? orders.filter(
        (o) =>
          o.customerName.toLowerCase().includes(user.name.toLowerCase()) ||
          o.customerEmail?.toLowerCase() === user.email.toLowerCase()
      )
    : []

  // التحقق من رقم الطلب في URL
  useEffect(() => {
    const orderFromUrl = searchParams.get("orderNumber")
    if (orderFromUrl) {
      setOrderNumber(orderFromUrl)
      handleSearch(orderFromUrl)
    }
  }, [searchParams])

  const handleSearch = (searchValue?: string) => {
    const valueToSearch = searchValue || orderNumber.trim()
    if (!valueToSearch) return

    setIsSearching(true)
    setNotFound(false)
    
    // محاكاة تأخير البحث
    setTimeout(() => {
      const found = orders.find(
        (o) => o.orderNumber.toLowerCase() === valueToSearch.toLowerCase()
      )
      
      if (found) {
        setSearchedOrder(found)
        setNotFound(false)
      } else {
        setSearchedOrder(null)
        setNotFound(true)
      }
      setIsSearching(false)
    }, 500)
  }

  const customerStage = searchedOrder 
    ? mapInternalStageToCustomerStage(searchedOrder.currentStage)
    : null

  const currentStageIndex = customerStage 
    ? CUSTOMER_STAGES_ORDER.indexOf(customerStage)
    : -1

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <WebsiteHeader />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">متابعة الطلب</h1>
            <p className="text-slate-600">أدخل رقم الطلب لمعرفة حالة طلبك</p>
          </div>

          {/* User Orders - when logged in */}
          {isLoggedIn && user && (
            <Card className="mb-8 border-blue-200 bg-blue-50/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    مرحباً {user.name}
                  </CardTitle>
                  <span className="text-sm text-slate-500">{userOrders.length} طلب</span>
                </div>
              </CardHeader>
              {userOrders.length > 0 ? (
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 mb-3">اختر طلباً لمتابعة حالته:</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {userOrders.map((order) => {
                      const stage = mapInternalStageToCustomerStage(order.currentStage)
                      const stageConfig = CUSTOMER_STAGES[stage]
                      return (
                        <button
                          key={order.id}
                          onClick={() => {
                            setOrderNumber(order.orderNumber)
                            handleSearch(order.orderNumber)
                          }}
                          className="w-full flex items-center justify-between p-3 bg-white rounded-lg border hover:border-blue-300 hover:shadow-sm transition-all text-right"
                        >
                          <div>
                            <p className="font-medium text-sm" dir="ltr">{order.orderNumber}</p>
                            <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString("ar-EG")}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${stageConfig.bgColor} ${stageConfig.color}`}>
                            {stageConfig.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </CardContent>
              ) : (
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-500 text-center py-4">لا توجد طلبات حتى الآن</p>
                </CardContent>
              )}
            </Card>
          )}

          {/* Login Prompt - when not logged in */}
          {!isLoggedIn && (
            <Card className="mb-8 border-amber-200 bg-amber-50/50">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <LogIn className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">سجل دخولك لعرض كل طلباتك</p>
                    <p className="text-xs text-slate-500">متابعة طلباتك بشكل أسهل</p>
                  </div>
                </div>
                <Link href="/client/login?redirect=/track-order">
                  <Button size="sm" variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                    تسجيل الدخول
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-sm text-slate-600 mb-4 text-center">أو ابحث برقم الطلب مباشرة:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="orderNumber" className="sr-only">رقم الطلب</Label>
                  <Input
                    id="orderNumber"
                    placeholder="أدخل رقم الطلب (مثال: ORD-20241125-001)"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="text-center text-lg"
                    dir="ltr"
                  />
                </div>
                <Button 
                  onClick={() => handleSearch()} 
                  disabled={isSearching || !orderNumber.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 ml-2" />
                  )}
                  بحث
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Not Found Message */}
          {notFound && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="p-6 text-center">
                <p className="text-red-600 font-medium mb-2">لم يتم العثور على الطلب</p>
                <p className="text-sm text-red-500">
                  تأكد من رقم الطلب وحاول مرة أخرى، أو تواصل معنا للمساعدة
                </p>
              </CardContent>
            </Card>
          )}

          {/* Order Status */}
          {searchedOrder && customerStage && (
            <div className="space-y-6">
              {/* Order Info Card */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">معلومات الطلب</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${CUSTOMER_STAGES[customerStage].bgColor} ${CUSTOMER_STAGES[customerStage].color}`}>
                      {CUSTOMER_STAGES[customerStage].label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">رقم الطلب:</span>
                      <p className="font-medium" dir="ltr">{searchedOrder.orderNumber}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">تاريخ الطلب:</span>
                      <p className="font-medium">{new Date(searchedOrder.createdAt).toLocaleDateString("ar-EG")}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">اسم العميل:</span>
                      <p className="font-medium">{searchedOrder.customerName}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">التسليم المتوقع:</span>
                      <p className="font-medium">{new Date(searchedOrder.expectedDelivery).toLocaleDateString("ar-EG")}</p>
                    </div>
                  </div>
                  
                  {/* Products */}
                  {searchedOrder.products && searchedOrder.products.length > 0 && (
                    <div className="pt-3 border-t">
                      <span className="text-slate-500 text-sm">المنتجات:</span>
                      <ul className="mt-1 space-y-1">
                        {searchedOrder.products.map((p, i) => (
                          <li key={i} className="text-sm flex justify-between">
                            <span>{p.productName} <span className="text-slate-400">x{p.quantity}</span></span>
                            <span className="font-medium">{p.totalPrice.toLocaleString()} ج.م</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t flex justify-between items-center">
                    <span className="text-slate-600">إجمالي الطلب:</span>
                    <span className="text-lg font-bold text-blue-600">{searchedOrder.totalCost.toLocaleString()} ج.م</span>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    حالة الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {CUSTOMER_STAGES_ORDER.map((stage, index) => {
                      const stageConfig = CUSTOMER_STAGES[stage]
                      const isCompleted = index < currentStageIndex
                      const isCurrent = index === currentStageIndex
                      const isPending = index > currentStageIndex
                      const Icon = stageConfig.icon

                      return (
                        <div key={stage} className="relative flex gap-4 pb-8 last:pb-0">
                          {/* Connector Line */}
                          {index < CUSTOMER_STAGES_ORDER.length - 1 && (
                            <div 
                              className={`absolute right-5 top-10 w-0.5 h-full -translate-x-1/2 ${
                                isCompleted ? "bg-green-500" : "bg-slate-200"
                              }`}
                            />
                          )}
                          
                          {/* Icon */}
                          <div 
                            className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? "bg-green-500 text-white" 
                                : isCurrent 
                                  ? `${stageConfig.bgColor} ${stageConfig.color}` 
                                  : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className={`flex-1 ${isPending ? "opacity-50" : ""}`}>
                            <h4 className={`font-medium ${isCurrent ? stageConfig.color : isCompleted ? "text-green-600" : "text-slate-400"}`}>
                              {stageConfig.label}
                            </h4>
                            <p className="text-sm text-slate-500 mt-0.5">
                              {stageConfig.description}
                            </p>
                            {isCurrent && (
                              <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                                الحالة الحالية
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-slate-600 mb-3">
                    لديك استفسار حول طلبك؟ تواصل معنا
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="tel:01012345678">
                      <Button variant="outline" size="sm">
                        اتصل بنا
                      </Button>
                    </Link>
                    <Link href="https://wa.me/201012345678" target="_blank">
                      <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                        واتساب
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Back to Home */}
          {!searchedOrder && !notFound && (
            <div className="text-center">
              <Link href="/">
                <Button variant="outline">
                  <Home className="w-4 h-4 ml-2" />
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
