"use client"

import { Plus, FileText, Receipt, Users, UserPlus, Zap, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function FloatingActionButtons() {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="h-14 w-14 rounded-full shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48" dir="rtl">
          <Link href="/accounting/invoice/quick">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <Zap className="h-4 w-4" />
              <span>فاتورة سريعة</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <Link href="/accounting/invoice/new">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <FileText className="h-4 w-4" />
              <span>إضافة فاتورة مبيعات</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounting/purchase/new">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <ShoppingCart className="h-4 w-4" />
              <span>استلام بضائع</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounting/expense/new">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <Receipt className="h-4 w-4" />
              <span>إضافة مصروف</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounting/supplier/new">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <Users className="h-4 w-4" />
              <span>إضافة مورد</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/accounting/customer/new">
            <DropdownMenuItem className="gap-2 py-2 cursor-pointer">
              <UserPlus className="h-4 w-4" />
              <span>إضافة عميل</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
