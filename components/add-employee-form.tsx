'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Shield, Clock, DollarSign, FileText, Calendar, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { ROLE_LABELS } from '@/lib/employee-profile-types'

export function AddEmployeeForm() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    router.push('/users')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50">
          <TabsTrigger value="basic" className="gap-2">
            <User className="h-4 w-4" />
            البيانات الأساسية
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="h-4 w-4" />
            الصلاحيات
          </TabsTrigger>
          <TabsTrigger value="schedule" className="gap-2">
            <Clock className="h-4 w-4" />
            الدوام
          </TabsTrigger>
          <TabsTrigger value="commissions" className="gap-2">
            <DollarSign className="h-4 w-4" />
            العمولات
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            الوثائق والبطاقة
          </TabsTrigger>
          <TabsTrigger value="records" className="gap-2">
            <Calendar className="h-4 w-4" />
            السجلات
          </TabsTrigger>
        </TabsList>

        {/* البيانات الأساسية */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>البيانات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل *</Label>
                  <Input id="name" placeholder="أدخل الاسم الكامل" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">رقم الموظف *</Label>
                  <Input id="employeeNumber" placeholder="EMP-001" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">المسمى الوظيفي *</Label>
                  <Input id="position" placeholder="المسمى الوظيفي" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">القسم *</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="printing">الطباعة</SelectItem>
                      <SelectItem value="design">التصميم</SelectItem>
                      <SelectItem value="cutting">القص واللحام</SelectItem>
                      <SelectItem value="finishing">التشطيب</SelectItem>
                      <SelectItem value="admin">الإدارة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId">الرقم القومي *</Label>
                  <Input id="nationalId" placeholder="الرقم القومي" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input id="phone" type="tel" placeholder="01xxxxxxxxx" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">تاريخ الميلاد</Label>
                  <Input id="birthdate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hireDate">تاريخ التعيين *</Label>
                  <Input id="hireDate" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">الراتب الأساسي (ج.م) *</Label>
                  <Input id="salary" type="number" placeholder="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insurance">رقم التأمينات</Label>
                  <Input id="insurance" placeholder="رقم التأمينات" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="insuranceAmount">قيمة التأمينات (ج.م)</Label>
                  <Input id="insuranceAmount" type="number" placeholder="0.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Textarea id="address" placeholder="العنوان الكامل" rows={3} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الصلاحيات */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>صلاحيات الموظف</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">الدور الوظيفي *</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{ROLE_LABELS.admin}</SelectItem>
                    <SelectItem value="manager">{ROLE_LABELS.manager}</SelectItem>
                    <SelectItem value="employee">{ROLE_LABELS.employee}</SelectItem>
                    <SelectItem value="viewer">{ROLE_LABELS.viewer}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>الصلاحيات التفصيلية</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'tasks_view', label: 'عرض المهام' },
                    { id: 'tasks_create', label: 'إضافة مهام' },
                    { id: 'tasks_edit', label: 'تعديل المهام' },
                    { id: 'tasks_delete', label: 'حذف المهام' },
                    { id: 'machines_view', label: 'عرض الآلات' },
                    { id: 'machines_edit', label: 'تعديل حالة الآلات' },
                    { id: 'attendance_view', label: 'عرض الحضور' },
                    { id: 'attendance_manage', label: 'إدارة الحضور' },
                    { id: 'accounting_view', label: 'عرض المحاسبة' },
                    { id: 'accounting_manage', label: 'إدارة المحاسبة' },
                    { id: 'users_view', label: 'عرض المستخدمين' },
                    { id: 'users_manage', label: 'إدارة المستخدمين' },
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-center gap-2">
                      <Checkbox id={permission.id} />
                      <Label htmlFor={permission.id} className="cursor-pointer">
                        {permission.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الدوام */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>مواعيد العمل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shift">الشفت *</Label>
                  <Select>
                    <SelectTrigger id="shift">
                      <SelectValue placeholder="اختر الشفت" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">صباحي (9ص - 5م)</SelectItem>
                      <SelectItem value="evening">مسائي (2م - 10م)</SelectItem>
                      <SelectItem value="night">ليلي (10م - 6ص)</SelectItem>
                      <SelectItem value="flexible">مرن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workDays">أيام العمل *</Label>
                  <Input id="workDays" placeholder="6 أيام" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">وقت البدء</Label>
                  <Input id="startTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">وقت الانتهاء</Label>
                  <Input id="endTime" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriod">فترة السماح (دقيقة)</Label>
                  <Input id="gracePeriod" type="number" placeholder="15" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overtimeRate">معدل الوقت الإضافي</Label>
                  <Input id="overtimeRate" type="number" placeholder="1.5" step="0.1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>أيام العمل الأسبوعية</Label>
                <div className="grid grid-cols-7 gap-2">
                  {['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map(
                    (day) => (
                      <div key={day} className="flex items-center gap-2">
                        <Checkbox id={day} />
                        <Label htmlFor={day} className="cursor-pointer text-sm">
                          {day}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* العمولات */}
        <TabsContent value="commissions">
          <Card>
            <CardHeader>
              <CardTitle>نظام العمولات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2">
                <Checkbox id="hasCommission" />
                <Label htmlFor="hasCommission" className="cursor-pointer">
                  يستحق عمولات
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="commissionType">نوع العمولة</Label>
                  <Select>
                    <SelectTrigger id="commissionType">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">نسبة مئوية</SelectItem>
                      <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                      <SelectItem value="tiered">متدرج</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionValue">قيمة العمولة</Label>
                  <Input id="commissionValue" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAmount">الحد الأدنى للاستحقاق (ج.م)</Label>
                  <Input id="minAmount" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxCommission">الحد الأقصى للعمولة (ج.م)</Label>
                  <Input id="maxCommission" type="number" placeholder="0.00" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commissionNotes">ملاحظات العمولة</Label>
                <Textarea
                  id="commissionNotes"
                  placeholder="أي ملاحظات أو شروط خاصة"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الوثائق والبطاقة */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>الوثائق والمستندات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="idCard">صورة البطاقة الشخصية</Label>
                  <Input id="idCard" type="file" accept="image/*,.pdf" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="photo">صورة شخصية</Label>
                  <Input id="photo" type="file" accept="image/*" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="contract">عقد العمل</Label>
                  <Input id="contract" type="file" accept=".pdf" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="certificates">الشهادات والمؤهلات</Label>
                  <Input
                    id="certificates"
                    type="file"
                    accept="image/*,.pdf"
                    multiple
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="insuranceDoc">مستندات التأمينات</Label>
                  <Input
                    id="insuranceDoc"
                    type="file"
                    accept="image/*,.pdf"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="other">مستندات أخرى</Label>
                  <Input id="other" type="file" accept="*" multiple className="mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* السجلات */}
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>سجلات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">جهة الاتصال في حالة الطوارئ</Label>
                <Input id="emergencyContact" placeholder="الاسم ورقم الهاتف" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount">رقم الحساب البنكي</Label>
                <Input id="bankAccount" placeholder="رقم الحساب" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">اسم البنك</Label>
                <Input id="bankName" placeholder="اسم البنك" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">ملاحظات عامة</Label>
                <Textarea id="notes" placeholder="أي ملاحظات أو معلومات إضافية" rows={4} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/users')}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          إلغاء
        </Button>
        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" />
          حفظ الموظف
        </Button>
      </div>
    </form>
  )
}
