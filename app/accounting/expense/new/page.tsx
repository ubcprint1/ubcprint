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
import { ArrowRight, Save, Upload } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NewExpensePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    amount: '',
    vendor: '',
    paymentMethod: '',
    receipt: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: حفظ المصروف
    alert('تم حفظ المصروف بنجاح')
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
            <h1 className="text-2xl font-bold text-foreground">إضافة مصروف جديد</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-6 py-8">
        <form onSubmit={handleSubmit}>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>التاريخ</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>
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
                      <SelectItem value="materials">مواد خام</SelectItem>
                      <SelectItem value="maintenance">صيانة</SelectItem>
                      <SelectItem value="salaries">رواتب</SelectItem>
                      <SelectItem value="utilities">مرافق</SelectItem>
                      <SelectItem value="transport">نقل وشحن</SelectItem>
                      <SelectItem value="office">مستلزمات مكتبية</SelectItem>
                      <SelectItem value="other">أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>الوصف</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="وصف تفصيلي للمصروف"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label>المبلغ (ج.م)</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label>المورد / الجهة</Label>
                  <Input
                    value={formData.vendor}
                    onChange={(e) =>
                      setFormData({ ...formData, vendor: e.target.value })
                    }
                    placeholder="اسم المورد أو الجهة"
                  />
                </div>
              </div>

              <div>
                <Label>طريقة الدفع</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">نقدي</SelectItem>
                    <SelectItem value="bank">بنك</SelectItem>
                    <SelectItem value="credit">بطاقة ائتمان</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>إيصال / فاتورة</Label>
                <div className="mt-2">
                  <Button type="button" variant="outline" className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    رفع الإيصال
                  </Button>
                </div>
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
                حفظ المصروف
              </Button>
            </div>
          </Card>
        </form>
      </main>
    </div>
  )
}
