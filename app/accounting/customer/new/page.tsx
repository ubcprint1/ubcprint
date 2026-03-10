"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ArrowRight, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewCustomerPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    type: "",
    taxId: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: حفظ العميل
    alert("تم إضافة العميل بنجاح")
    router.push("/accounting/customers")
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/accounting">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">إضافة عميل جديد</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>اسم العميل</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اسم العميل أو الشركة"
                    required
                  />
                </div>
                <div>
                  <Label>نوع العميل</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العميل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">فرد</SelectItem>
                      <SelectItem value="company">شركة</SelectItem>
                      <SelectItem value="advertising">مكتب دعاية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>رقم الهاتف</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label>العنوان</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="العنوان الكامل"
                  rows={2}
                />
              </div>

              <div>
                <Label>الرقم الضريبي (اختياري)</Label>
                <Input
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  placeholder="الرقم الضريبي للعميل"
                />
              </div>

              <div>
                <Label>ملاحظات</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="ملاحظات إضافية عن العميل"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link href="/accounting/customers">
                <Button type="button" variant="outline">
                  إلغاء
                </Button>
              </Link>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                حفظ العميل
              </Button>
            </div>
          </Card>
        </form>
      </main>
    </div>
  )
}
