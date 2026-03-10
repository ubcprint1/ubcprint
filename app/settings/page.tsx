import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Bell, Lock, User, Globe, Palette } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">الإعدادات</h1>
                <p className="text-sm text-muted-foreground">إدارة إعدادات الحساب والنظام</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              الملف الشخصي
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Lock className="h-4 w-4" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              المظهر
            </TabsTrigger>
            <TabsTrigger value="language" className="gap-2">
              <Globe className="h-4 w-4" />
              اللغة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
                <CardDescription>تحديث معلومات حسابك الشخصية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" defaultValue="أحمد محمود" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue="ahmed@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" type="tel" defaultValue="+966 50 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">المنصب الوظيفي</Label>
                  <Input id="position" defaultValue="مدير النظام" disabled />
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>الأمان وكلمة المرور</CardTitle>
                <CardDescription>إدارة إعدادات الأمان وتغيير كلمة المرور</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>المصادقة الثنائية</Label>
                    <p className="text-sm text-muted-foreground">تفعيل المصادقة الثنائية لحماية إضافية</p>
                  </div>
                  <Switch />
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>اختر كيفية تلقي الإشعارات</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground">تلقي الإشعارات عبر البريد الإلكتروني</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>إشعارات الطلبات الجديدة</Label>
                    <p className="text-sm text-muted-foreground">عند إضافة طلب جديد</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>إشعارات المهام</Label>
                    <p className="text-sm text-muted-foreground">عند تعيين مهمة جديدة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>إشعارات الحضور</Label>
                    <p className="text-sm text-muted-foreground">تنبيهات الحضور والانصراف</p>
                  </div>
                  <Switch />
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>تخصيص مظهر واجهة المستخدم</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label>الوضع الداكن</Label>
                    <p className="text-sm text-muted-foreground">تفعيل الوضع الداكن للعين</p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label>حجم الخط</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option>صغير</option>
                    <option selected>متوسط</option>
                    <option>كبير</option>
                  </select>
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>اللغة والمنطقة</CardTitle>
                <CardDescription>اختر اللغة المفضلة والتنسيقات الإقليمية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>اللغة</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option selected>العربية</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>المنطقة الزمنية</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option selected>توقيت الرياض (GMT+3)</option>
                    <option>توقيت القاهرة (GMT+2)</option>
                    <option>توقيت دبي (GMT+4)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>تنسيق التاريخ</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option selected>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
                <Button>حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
