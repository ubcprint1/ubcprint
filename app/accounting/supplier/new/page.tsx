'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { ArrowRight, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewSupplierPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    taxId: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: حفظ المورد
    alert('تم إضافة المورد بنجاح')
    router.push('/accounting')
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
            <h1 className="text-2xl font-bold text-foreground">إضافة مورد جديد</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>اسم المورد</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="اسم الشركة أو المورد"
                    required
                  />
                </div>
                <div>
                  <Label>الشخص المسؤول</Label>
                  <Input
                    value={formData.contactPerson}
                    onChange={(e) =>
                      setFormData({ ...formData, contactPerson: e.target.value })
                    }
                    placeholder="اسم الشخص المسؤول"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>رقم الهاتف</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="01xxxxxxxxx"
                    required
                  />
                </div>
                <div>
                  <Label>البريد الإلكتروني</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <Label>العنوان</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="العنوان الكامل"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>الفئة</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paper">ورق</SelectItem>
                      <SelectItem value="ink">حبر وأحبار</SelectItem>
                      <SelectItem value="parts">قطع غيار</SelectItem>
                      <SelectItem value="equipment">معدات</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>الرقم الضريبي</Label>
                  <Input
                    value={formData.taxId}
                    onChange={(e) =>
                      setFormData({ ...formData, taxId: e.target.value })
                    }
                    placeholder="الرقم الضريبي"
                  />
                </div>
              </div>

              <div>
                <Label>ملاحظات</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="ملاحظات إضافية"
                  rows={3}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <Link href="/accounting">
                <Button type="button" variant="outline">
                  إلغاء
                </Button>
              </Link>
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                حفظ المورد
              </Button>
            </div>
          </Card>
        </form>
      </main>
    </div>
  )
}
