"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Headset, LogIn, BriefcaseBusiness, ShieldCheck, Menu, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { href: "/products", label: "المنتجات المخصصة" },
  { href: "/products/apparel", label: "الملابس" },
  { href: "/products/promo", label: "المنتجات الترويجية" },
  { href: "/products/events", label: "المجموعات والفعاليات" },
  { href: "/design", label: "استوديو التصميم" },
]

export function WebsiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/login" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 rounded-full border border-slate-200 text-slate-700">
              <ShieldCheck className="h-4 w-4" />
              دخول الأدمن
            </Button>
          </Link>
          <Link href="/staff/login" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 rounded-full border border-slate-200 text-slate-700">
              <BriefcaseBusiness className="h-4 w-4" />
              دخول الموظفين
            </Button>
          </Link>
          <Link href="/client/login" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-slate-700">
              <LogIn className="h-4 w-4" />
              دخول العميل
            </Button>
          </Link>
          <Link href="/help" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-slate-700">
              <Headset className="h-4 w-4" />
              المساعدة
            </Button>
          </Link>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-700 transition hover:text-[#223982]">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 text-[#1A2E42]">
            <span className="text-2xl font-black">UBC Print</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#223982] text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </Link>
          <button className="rounded-lg p-2 text-slate-700 lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6 lg:px-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/help" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
              المساعدة
            </Link>
            <Link href="/client/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
              دخول العميل
            </Link>
            <Link href="/staff/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
              دخول الموظفين
            </Link>
            <Link href="/admin/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
              دخول الأدمن
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
