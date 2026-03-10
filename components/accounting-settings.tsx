'use client'

import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AccountingSettings() {
  const [taxRate, setTaxRate] = useState('15')
  const [invoicePrefix, setInvoicePrefix] = useState('INV')
  const [openingBalance, setOpeningBalance] = useState('0')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          إعدادات الحسابات
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>إعدادات الحسابات</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="categories">التصنيفات</TabsTrigger>
            <TabsTrigger value="taxes">الضرائب</TabsTrigger>
            <TabsTrigger value="payments">طرق الدفع</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-prefix">رمز الفاتورة</Label>
              <Input
                id="invoice-prefix"
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                placeholder="INV"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="opening-balance">الرصيد الافتتاحي</Label>
              <Input
                id="opening-balance"
                type="number"
                value={openingBalance}
                onChange={(e) => setOpeningBalance(e.target.value)}
                placeholder="0"
              />
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="space-y-2">
              <Label>تصنيفات المصروفات</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input value="مواد خام" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="صيانة" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="رواتب" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  إضافة تصنيف جديد
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="taxes" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tax-rate">نسبة الضريبة (%)</Label>
              <Input
                id="tax-rate"
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                placeholder="15"
              />
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="space-y-2">
              <Label>طرق الدفع المتاحة</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Input value="نقدي" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="بنكي" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input value="بطاقة ائتمان" readOnly />
                  <Button variant="outline" size="sm">
                    حذف
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  إضافة طريقة دفع جديدة
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2">
          <Button variant="outline">إلغاء</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            حفظ التغييرات
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
