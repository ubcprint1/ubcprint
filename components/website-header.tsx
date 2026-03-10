"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Printer, ShoppingBag, Phone, Menu, X, Package } from "lucide-react"
import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/cart-store"

export function WebsiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { getTotalItems } = useCartStore()
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const cartItemsCount = mounted ? getTotalItems() : 0

  const navLinks = [
    { href: "/products", label: "المنتجات المخصصة" },
    { href: "/products/apparel", label: "الملابس" },
    { href: "/products/promo", label: "المنتجات الترويجية" },
    { href: "/products/events", label: "المجموعات والفعاليات" },
    { href: "/design", label: "استوديو التصميم" },
  ]

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <Printer className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">UBC Print</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/track-order">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                <Package className="h-4 w-4" />
                متابعة طلبك
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                <Phone className="h-4 w-4" />
                المساعدة
              </Button>
            </Link>
            <Link href="/client/login">
              <Button variant="ghost" size="sm">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
