'use client'

import { useState } from 'react'
import { User, Shield, Clock, DollarSign, FileText, Calendar, MapPin, Mail, Phone, CreditCard, Upload, Download, Edit, Archive, CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import type { EmployeeProfile } from '@/lib/employee-profile-types'
import { calculateWorkDuration, ROLE_LABELS } from '@/lib/employee-profile-types'

interface EmployeeProfileTabsProps {
  employee: EmployeeProfile
}

export function EmployeeProfileTabs({ employee }: EmployeeProfileTabsProps) {
  const [isEditing, setIsEditing] = useState(false)
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="space-y-6">
      {/* رأس الملف */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {getInitials(employee.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{employee.name}</h2>
                  <Badge
                    variant={employee.status === 'active' ? 'default' : 'secondary'}
                    className="gap-1"
                  >
                    {employee.status === 'active' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        على رأس العمل
                      </>
                    ) : (
                      <>
                        <Archive className="h-3 w-3" />
                        أرشيف
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {employee.position}
                  </span>
                  <span className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    رقم الموظف: {employee.employeeNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    فترة العمل: {calculateWorkDuration(employee.hireDate)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                <Edit className="h-4 w-4 ml-2" />
                {isEditing ? 'إلغاء' : 'تعديل'}
              </Button>
              {employee.status === 'active' && (
                <Button variant="outline" size="sm" className="text-destructive">
                  <Archive className="h-4 w-4 ml-2" />
                  أرشفة
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* التبويبات */}
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
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
          <TabsTrigger value="commission" className="gap-2">
            <DollarSign className="h-4 w-4" />
            العمولات
          </TabsTrigger>
          <TabsTrigger value="documents" className="gap-2">
            <FileText className="h-4 w-4" />
            الوثائق والبطاقة
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
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
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>الاسم الكامل</Label>
                  <Input value={employee.name} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>رقم الموظف</Label>
                  <Input value={employee.employeeNumber} disabled />
                </div>
                
                <div className="space-y-2">
                  <Label>الوظيفة</Label>
                  <Input value={employee.position} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>القسم</Label>
                  <Input value={employee.department} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>تاريخ التعيين</Label>
                  <Input type="date" value={employee.hireDate} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>فترة العمل</Label>
                  <Input value={calculateWorkDuration(employee.hireDate)} disabled />
                </div>
                
                <div className="space-y-2">
                  <Label>الراتب الأساسي (جنيه)</Label>
                  <Input
                    type="number"
                    value={employee.salary}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>التأمينات (جنيه)</Label>
                  <Input
                    type="number"
                    value={employee.insurance}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    البريد الإلكتروني
                  </Label>
                  <Input type="email" value={employee.email} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    رقم الهاتف
                  </Label>
                  <Input type="tel" value={employee.phone} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label>الرقم القومي</Label>
                  <Input value={employee.nationalId} disabled={!isEditing} />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    العنوان
                  </Label>
                  <Input value={employee.address} disabled={!isEditing} />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                  <Button>حفظ التغييرات</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* الصلاحيات */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>صلاحيات الموظف</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <h4 className="font-semibold">الدور الوظيفي</h4>
                    <p className="text-sm text-muted-foreground">
                      يحدد مستوى الصلاحيات العام
                    </p>
                  </div>
                  <Badge variant="outline" className="text-base">
                    {ROLE_LABELS[employee.role]}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">الصلاحيات التفصيلية</h4>
                  
                  {Object.entries(employee.permissions).map(([key, perms]) => (
                    <Card key={key}>
                      <CardContent className="pt-6">
                        <h5 className="mb-4 font-medium">
                          {key === 'tasks' && 'المهام'}
                          {key === 'machines' && 'الآلات'}
                          {key === 'attendance' && 'الحضور'}
                          {key === 'accounting' && 'المحاسبة'}
                          {key === 'users' && 'المستخدمين'}
                        </h5>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="flex items-center justify-between">
                            <Label>عرض</Label>
                            <div className="flex items-center gap-2">
                              {perms.view ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <Switch checked={perms.view} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>إنشاء</Label>
                            <div className="flex items-center gap-2">
                              {perms.create ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <Switch checked={perms.create} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>تعديل</Label>
                            <div className="flex items-center gap-2">
                              {perms.edit ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <Switch checked={perms.edit} disabled={!isEditing} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>حذف</Label>
                            <div className="flex items-center gap-2">
                              {perms.delete ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-destructive" />
                              )}
                              <Switch checked={perms.delete} disabled={!isEditing} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                  <Button>حفظ التغييرات</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* الدوام */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>مواعيد العمل والشفتات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>الشفت الأساسي</Label>
                    <Input value={employee.workSchedule.shift} disabled={!isEditing} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>أيام العمل</Label>
                    <Input
                      value={employee.workSchedule.workDays.join(' - ')}
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>وقت الحضور</Label>
                    <Input
                      type="time"
                      value={employee.workSchedule.checkIn}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>وقت الانصراف</Label>
                    <Input
                      type="time"
                      value={employee.workSchedule.checkOut}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {employee.workSchedule.additionalShifts &&
                  employee.workSchedule.additionalShifts.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold">الشفتات الإضافية</h4>
                      {employee.workSchedule.additionalShifts.map((shift, idx) => (
                        <Card key={idx}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{shift.date}</p>
                                <p className="text-sm text-muted-foreground">
                                  {shift.shift} - {shift.reason}
                                </p>
                              </div>
                              {isEditing && (
                                <Button variant="ghost" size="sm">
                                  حذف
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}

                {isEditing && (
                  <Button variant="outline" className="w-full">
                    إضافة شفت إضافي
                  </Button>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                  <Button>حفظ التغييرات</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* العمولات */}
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>نظام العمولات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <h4 className="font-semibold">تفعيل العمولة</h4>
                    <p className="text-sm text-muted-foreground">
                      هل يحصل الموظف على عمولة؟
                    </p>
                  </div>
                  <Switch
                    checked={employee.commission?.enabled || false}
                    disabled={!isEditing}
                  />
                </div>

                {employee.commission?.enabled && (
                  <>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>نوع العمولة</Label>
                        <Input
                          value={
                            employee.commission.type === 'percentage'
                              ? 'نسبة مئوية'
                              : 'مبلغ ثابت'
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>
                          القيمة ({employee.commission.type === 'percentage' ? '%' : 'جنيه'})
                        </Label>
                        <Input
                          type="number"
                          value={employee.commission.value}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>ملاحظات</Label>
                      <Textarea
                        value={employee.commission.notes}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    {employee.commission.history.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-semibold">سجل العمولات</h4>
                        <div className="space-y-2">
                          {employee.commission.history.map((record, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between rounded-lg border border-border p-3"
                            >
                              <div>
                                <p className="font-medium">{record.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(record.date).toLocaleDateString('ar-EG', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-base">
                                {record.amount} جنيه
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    إلغاء
                  </Button>
                  <Button>حفظ التغييرات</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* الوثائق والبطاقة */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>الوثائق والبطاقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* بطاقة الموظف */}
                <div className="space-y-3">
                  <h4 className="font-semibold">بطاقة الموظف (ID Card)</h4>
                  {employee.documents.idCard ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-3">
                              <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">بطاقة الموظف</p>
                              <p className="text-sm text-muted-foreground">
                                تم الرفع في{' '}
                                {new Date(
                                  employee.documents.idCard.uploadedAt
                                ).toLocaleDateString('ar-EG')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {isEditing && (
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button variant="outline" className="w-full gap-2">
                      <Upload className="h-4 w-4" />
                      رفع بطاقة الموظف
                    </Button>
                  )}
                </div>

                {/* عقد العمل */}
                <div className="space-y-3">
                  <h4 className="font-semibold">عقد العمل</h4>
                  {employee.documents.contract ? (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-3">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">عقد العمل</p>
                              <p className="text-sm text-muted-foreground">
                                تم الرفع في{' '}
                                {new Date(
                                  employee.documents.contract.uploadedAt
                                ).toLocaleDateString('ar-EG')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                            {isEditing && (
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Button variant="outline" className="w-full gap-2">
                      <Upload className="h-4 w-4" />
                      رفع عقد العمل
                    </Button>
                  )}
                </div>

                {/* وثائق أخرى */}
                <div className="space-y-3">
                  <h4 className="font-semibold">وثائق أخرى</h4>
                  {employee.documents.other.length > 0 ? (
                    <div className="space-y-2">
                      {employee.documents.other.map((doc, idx) => (
                        <Card key={idx}>
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-2">
                                  <FileText className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(doc.uploadedAt).toLocaleDateString('ar-EG')}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                                {isEditing && (
                                  <Button variant="ghost" size="sm">
                                    حذف
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      لا توجد وثائق أخرى
                    </p>
                  )}
                  <Button variant="outline" className="w-full gap-2">
                    <Upload className="h-4 w-4" />
                    إضافة وثيقة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* السجلات */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>سجل العمليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-center text-sm text-muted-foreground py-8">
                  سيتم عرض سجل جميع العمليات المتعلقة بالموظف هنا
                  <br />
                  (التعديلات، الترقيات، الجزاءات، الإجازات، إلخ)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
