"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { useCartStore } from "@/lib/cart-store"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Package, ChevronLeft, Truck, Shield } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()
  
  const subtotal = getTotalPrice()
  const shipping = subtotal >= 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">الرئيسية</Link>
          <ChevronLeft className="h-4 w-4" />
          <span className="text-slate-900">سلة المشتريات</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">سلة المشتريات</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">سلة المشتريات فارغة</h2>
            <p className="text-slate-600 mb-8">لم تقم بإضافة أي منتجات بعد. تصفح منتجاتنا وابدأ التسوق!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <ShoppingBag className="w-5 h-5 ml-2" />
                  تصفح المنتجات
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  <ArrowLeft className="w-5 h-5 ml-2" />
                  العودة للرئيسية
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
                  <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-10 h-10 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <Link href={`/products/${item.id}`} className="hover:text-blue-600">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    {item.options && (
                      <div className="text-sm text-slate-500 mt-1">
                        {item.options.size && <span>الحجم: {item.options.size}</span>}
                        {item.options.color && <span> | اللون: {item.options.color}</span>}
                        {item.options.printType && <span> | الطباعة: {item.options.printType}</span>}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-slate-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-slate-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-left">
                        <span className="text-xl font-bold text-blue-600">
                          {(item.price * item.quantity).toLocaleString()} ج.م
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-slate-500">{item.price} ج.م للوحدة</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50 bg-transparent">
                  <Trash2 className="w-4 h-4 ml-2" />
                  إفراغ السلة
                </Button>
                <Link href="/products">
                  <Button variant="outline">
                    <ShoppingBag className="w-4 h-4 ml-2" />
                    متابعة التسوق
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6">ملخص الطلب</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-600">المجموع الفرعي ({items.length} منتجات)</span>
                    <span className="font-medium">{subtotal.toLocaleString()} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">الشحن</span>
                    <span className="font-medium">{shipping === 0 ? "مجاني" : `${shipping} ج.م`}</span>
                  </div>
                  {subtotal < 500 && (
                    <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg">
                      أضف {(500 - subtotal).toLocaleString()} ج.م للحصول على شحن مجاني!
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>الإجمالي</span>
                    <span className="text-blue-600">{total.toLocaleString()} ج.م</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-lg">
                    إتمام الشراء
                    <ChevronLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>

                <div className="mt-6 pt-4 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>دفع آمن 100%</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span>توصيل خلال 3-7 أيام عمل</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <WebsiteFooter />
    </div>
  )
}
