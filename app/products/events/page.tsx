"use client"

import { useState } from "react"
import { WebsiteHeader } from "@/components/website-header"
import { WebsiteFooter } from "@/components/website-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Gift,
  Users,
  GraduationCap,
  PartyPopper,
  Building2,
  Heart,
  Trophy,
  Briefcase,
  Package,
  Check,
  Plus,
  Minus,
  Upload,
  MessageCircle,
  Sparkles,
  Award,
  Cake,
  Scissors,
  Star,
} from "lucide-react"

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("gifts")
  const [selectedBox, setSelectedBox] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(10)
  const [customizations, setCustomizations] = useState<Record<string, boolean>>({})
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "", notes: "" })

  const categories = [
    { id: "gifts", name: "بوكسات الهدايا", icon: Gift, description: "هدايا للموظفين والشركات" },
    { id: "graduation", name: "حفلات التخرج", icon: GraduationCap, description: "تجهيزات حفلات التخرج" },
    { id: "opening", name: "افتتاح المشاريع", icon: Scissors, description: "مستلزمات الافتتاحات" },
    { id: "birthday", name: "أعياد الميلاد", icon: Cake, description: "تجهيزات أعياد الميلاد" },
    { id: "corporate", name: "فعاليات الشركات", icon: Building2, description: "مؤتمرات واجتماعات" },
    { id: "wedding", name: "حفلات الزفاف", icon: Heart, description: "توزيعات وهدايا الأفراح" },
  ]

  const giftBoxes = [
    {
      id: "employee-basic",
      name: "بوكس الموظف الأساسي",
      description: "هدية مثالية للموظفين الجدد أو المناسبات البسيطة",
      items: ["دفتر ملاحظات A5", "قلم معدني فاخر", "كوب سيراميك"],
      basePrice: 150,
    },
    {
      id: "employee-premium",
      name: "بوكس الموظف المميز",
      description: "هدية فاخرة تليق بالموظفين المتميزين",
      items: ["دفتر جلد طبيعي A5", "قلم Parker أو Sheaffer", "باور بانك 10000mAh", "حامل بطاقات جلد"],
      basePrice: 350,
    },
    {
      id: "employee-executive",
      name: "بوكس التنفيذي",
      description: "للمدراء والتنفيذيين - أعلى مستوى من الفخامة",
      items: ["دفتر جلد إيطالي A4", "طقم أقلام فاخر", "شاحن لاسلكي + باور بانك", "محفظة جلد طبيعي", "ساعة ذكية أو كلاسيكية"],
      basePrice: 750,
    },
    {
      id: "welcome-kit",
      name: "كيت الترحيب بالموظف الجديد",
      description: "كل ما يحتاجه الموظف الجديد في يومه الأول",
      items: ["تيشيرت بشعار الشركة", "بطاقة تعريف + حامل", "دفتر ملاحظات", "قلم", "زجاجة مياه", "حقيبة قماشية"],
      basePrice: 250,
    },
    {
      id: "ramadan-box",
      name: "بوكس رمضان",
      description: "هدية رمضانية مميزة للموظفين والعملاء",
      items: ["علبة تمر فاخرة", "فانوس رمضاني", "سبحة", "حامل مصحف"],
      basePrice: 200,
    },
    {
      id: "eid-box",
      name: "بوكس العيد",
      description: "هدية العيد للموظفين والعملاء",
      items: ["علبة حلويات", "كارت معايدة مخصص", "عطر صغير", "شوكولاتة فاخرة"],
      basePrice: 180,
    },
  ]

  const eventPackages: Record<string, Array<{ id: string; name: string; description: string; items: string[]; price: number; popular?: boolean }>> = {
    graduation: [
      {
        id: "grad-basic",
        name: "باقة التخرج الأساسية",
        description: "للحفلات الصغيرة حتى 50 شخص",
        items: ["بنر تهنئة كبير", "50 كارت دعوة", "50 توزيعة صغيرة", "شهادات تخرج مطبوعة"],
        price: 1500
      },
      {
        id: "grad-premium",
        name: "باقة التخرج المميزة",
        description: "للحفلات المتوسطة حتى 150 شخص",
        items: ["بنر تهنئة كبير", "خلفية تصوير", "150 كارت دعوة", "150 توزيعة", "شهادات فاخرة", "ستاند ترحيب"],
        price: 3500,
        popular: true
      },
      {
        id: "grad-vip",
        name: "باقة التخرج VIP",
        description: "للحفلات الكبيرة والجامعات",
        items: ["مسرح كامل التجهيز", "خلفيات متعددة", "300+ كارت دعوة", "توزيعات فاخرة", "شهادات مذهبة", "ألبوم صور", "فيديو"],
        price: 8000
      },
    ],
    opening: [
      {
        id: "open-basic",
        name: "باقة الافتتاح الأساسية",
        description: "للمشاريع الصغيرة والمحلات",
        items: ["لافتة افتتاح", "بالونات", "شريط قص", "50 كارت دعوة", "بوسترات داخلية"],
        price: 2000
      },
      {
        id: "open-premium",
        name: "باقة الافتتاح المميزة",
        description: "للشركات والمعارض",
        items: ["لافتة LED", "أقواس بالونات", "شريط قص فاخر", "100 كارت دعوة", "رول أب", "خلفية تصوير", "هدايا للحضور"],
        price: 5000,
        popular: true
      },
      {
        id: "open-vip",
        name: "باقة الافتتاح الكبرى",
        description: "للافتتاحات الرسمية والكبرى",
        items: ["تجهيز كامل للمكان", "إضاءة احترافية", "مسرح صغير", "كل مستلزمات الافتتاح", "هدايا VIP", "تغطية إعلامية"],
        price: 15000
      },
    ],
    birthday: [
      {
        id: "bday-kids",
        name: "باقة عيد ميلاد الأطفال",
        description: "للأطفال من 3-12 سنة",
        items: ["بنر عيد ميلاد مخصص", "بالونات ملونة", "أطباق وأكواب", "توزيعات للأطفال", "كارت دعوة", "قبعات"],
        price: 800
      },
      {
        id: "bday-teen",
        name: "باقة عيد ميلاد الشباب",
        description: "للمراهقين والشباب",
        items: ["بنر مودرن", "بالونات هيليوم", "خلفية تصوير", "توزيعات عصرية", "كارت دعوة أنيق"],
        price: 1200,
        popular: true
      },
      {
        id: "bday-adult",
        name: "باقة عيد ميلاد الكبار",
        description: "حفلات أنيقة ومميزة",
        items: ["ديكور أنيق", "بالونات ذهبية/فضية", "خلفية فاخرة", "توزيعات راقية", "دعوات مطبوعة"],
        price: 2000
      },
    ],
    corporate: [
      {
        id: "corp-meeting",
        name: "باقة الاجتماعات",
        description: "لاجتماعات مجلس الإدارة",
        items: ["مجلدات جلدية", "أقلام فاخرة", "بلوكات ملاحظات", "لافتات أسماء", "ملصقات الشركة"],
        price: 1500
      },
      {
        id: "corp-conference",
        name: "باقة المؤتمرات",
        description: "للمؤتمرات والندوات",
        items: ["شنط مؤتمرات", "بطاقات تعريف", "بروشورات", "رول أب", "بنرات", "هدايا للمتحدثين"],
        price: 5000,
        popular: true
      },
      {
        id: "corp-exhibition",
        name: "باقة المعارض",
        description: "للمشاركة في المعارض",
        items: ["ستاند معرض كامل", "بروشورات", "كتالوجات", "هدايا ترويجية", "لافتات", "شاشات عرض"],
        price: 12000
      },
    ],
    wedding: [
      {
        id: "wed-invitation",
        name: "باقة الدعوات",
        description: "كروت دعوة الزفاف",
        items: ["100 كارت دعوة فاخر", "أظرف مميزة", "ختم الشمع", "ملصقات"],
        price: 2500
      },
      {
        id: "wed-giveaway",
        name: "باقة التوزيعات",
        description: "هدايا للمدعوين",
        items: ["100 توزيعة مخصصة", "علب أنيقة", "بطاقات شكر", "أشرطة ساتان"],
        price: 3000,
        popular: true
      },
      {
        id: "wed-complete",
        name: "باقة الزفاف الشاملة",
        description: "كل ما تحتاجه لحفل الزفاف",
        items: ["دعوات + توزيعات", "لافتات ترحيب", "خلفية كوشة", "ألبوم توقيعات", "قائمة الطعام"],
        price: 8000
      },
    ],
  }

  const handleWhatsAppOrder = () => {
    let orderDetails = ""
    
    if (selectedCategory === "gifts" && selectedBox) {
      const box = giftBoxes.find(b => b.id === selectedBox)
      orderDetails = `طلب بوكس هدايا:
- النوع: ${box?.name}
- الكمية: ${quantity} بوكس
- السعر التقديري: ${(box?.basePrice || 0) * quantity} ج.م`
    } else if (selectedEvent) {
      const packages = eventPackages[selectedCategory] || []
      const pkg = packages.find(p => p.id === selectedEvent)
      orderDetails = `طلب باقة فعالية:
- النوع: ${pkg?.name}
- الفئة: ${categories.find(c => c.id === selectedCategory)?.name}`
    }

    const message = `مرحبا، أريد الاستفسار عن:

${orderDetails}

بيانات التواصل:
- الاسم: ${contactInfo.name}
- الجوال: ${contactInfo.phone}
${contactInfo.notes ? `- ملاحظات: ${contactInfo.notes}` : ""}`

    window.open(`https://wa.me/201036930965?text=${encodeURIComponent(message)}`, "_blank")
  }

  const currentPackages = eventPackages[selectedCategory] || []

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" dir="rtl">
      <WebsiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge className="bg-white/20 text-white mb-4">خدمات متكاملة</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">المجموعات والفعاليات</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              بوكسات هدايا مميزة للموظفين وتجهيزات كاملة لجميع المناسبات والفعاليات
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setSelectedBox(null)
                    setSelectedEvent(null)
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <cat.icon className="h-5 w-5" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Gift Boxes Section */}
          {selectedCategory === "gifts" && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">بوكسات الهدايا للشركات</h2>
                <p className="text-slate-600">اختر البوكس المناسب وخصصه بشعار شركتك</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {giftBoxes.map((box) => (
                  <Card
                    key={box.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedBox === box.id ? "ring-2 ring-purple-600" : ""
                    }`}
                    onClick={() => setSelectedBox(box.id)}
                  >
                    <CardContent className="p-6">
                      <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center">
                        <Package className="h-16 w-16 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{box.name}</h3>
                      <p className="text-slate-600 text-sm mb-4">{box.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <p className="text-sm font-medium text-slate-700">محتويات البوكس:</p>
                        {box.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="h-4 w-4 text-green-500" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-purple-600">{box.basePrice}</span>
                          <span className="text-slate-500 text-sm mr-1">ج.م / بوكس</span>
                        </div>
                        {selectedBox === box.id && (
                          <Badge className="bg-purple-600">تم الاختيار</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quantity & Customization */}
              {selectedBox && (
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">تخصيص الطلب</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="mb-2 block">الكمية المطلوبة</Label>
                          <div className="flex items-center gap-4">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setQuantity(Math.max(1, quantity - 5))}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-24 text-center text-lg font-bold"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => setQuantity(quantity + 5)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-slate-500 mt-2">الحد الأدنى للطلب: 10 بوكسات</p>
                        </div>

                        <div>
                          <Label className="mb-2 block">إضافات اختيارية</Label>
                          <div className="space-y-2">
                            {[
                              { id: "logo", name: "طباعة شعار الشركة", price: "+10 ج.م" },
                              { id: "name", name: "طباعة اسم المستلم", price: "+5 ج.م" },
                              { id: "card", name: "كارت تهنئة مخصص", price: "+15 ج.م" },
                              { id: "wrap", name: "تغليف فاخر", price: "+20 ج.م" },
                            ].map((addon) => (
                              <label
                                key={addon.id}
                                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50"
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={customizations[addon.id] || false}
                                    onChange={(e) => setCustomizations({
                                      ...customizations,
                                      [addon.id]: e.target.checked
                                    })}
                                    className="rounded"
                                  />
                                  <span>{addon.name}</span>
                                </div>
                                <span className="text-purple-600 font-medium">{addon.price}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <Label className="mb-2 block">رفع شعار الشركة (اختياري)</Label>
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all">
                            <Upload className="h-10 w-10 mx-auto text-slate-400 mb-2" />
                            <p className="text-slate-600 text-sm">اضغط لرفع الشعار</p>
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-6">
                          <h4 className="font-bold text-lg mb-4">ملخص الطلب</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>البوكس:</span>
                              <span className="font-medium">{giftBoxes.find(b => b.id === selectedBox)?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>الكمية:</span>
                              <span className="font-medium">{quantity} بوكس</span>
                            </div>
                            <div className="flex justify-between">
                              <span>سعر الوحدة:</span>
                              <span className="font-medium">{giftBoxes.find(b => b.id === selectedBox)?.basePrice} ج.م</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                              <span>الإجمالي التقديري:</span>
                              <span className="text-purple-600">
                                {(giftBoxes.find(b => b.id === selectedBox)?.basePrice || 0) * quantity} ج.م
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Event Packages Section */}
          {selectedCategory !== "gifts" && currentPackages.length > 0 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">{categories.find(c => c.id === selectedCategory)?.name}</h2>
                <p className="text-slate-600">{categories.find(c => c.id === selectedCategory)?.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {currentPackages.map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`relative cursor-pointer transition-all hover:shadow-lg ${
                      selectedEvent === pkg.id ? "ring-2 ring-purple-600" : ""
                    } ${pkg.popular ? "border-purple-300" : ""}`}
                    onClick={() => setSelectedEvent(pkg.id)}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-2 right-4 bg-gradient-to-r from-purple-600 to-pink-600">
                        الأكثر طلبا
                      </Badge>
                    )}
                    <CardContent className="p-6">
                      <div className={`h-32 rounded-xl mb-4 flex items-center justify-center ${
                        pkg.popular 
                          ? "bg-gradient-to-br from-purple-100 to-pink-100" 
                          : "bg-gradient-to-br from-slate-100 to-slate-200"
                      }`}>
                        <Sparkles className={`h-12 w-12 ${pkg.popular ? "text-purple-400" : "text-slate-400"}`} />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        {pkg.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-2xl font-bold text-purple-600">{pkg.price.toLocaleString()}</span>
                          <span className="text-slate-500 text-sm mr-1">ج.م</span>
                        </div>
                        {selectedEvent === pkg.id && (
                          <Badge className="bg-purple-600">تم الاختيار</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contact Form */}
          {(selectedBox || selectedEvent) && (
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">بيانات التواصل</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block">الاسم *</Label>
                    <Input
                      placeholder="أدخل اسمك"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">رقم الجوال *</Label>
                    <Input
                      placeholder="01xxxxxxxxx"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-2 block">ملاحظات إضافية</Label>
                    <Textarea
                      placeholder="أي تفاصيل إضافية تريد إخبارنا بها..."
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleWhatsAppOrder}
                  size="lg"
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 gap-2"
                  disabled={!contactInfo.name || !contactInfo.phone}
                >
                  <MessageCircle className="h-5 w-5" />
                  اطلب الآن عبر واتساب
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <Card className="text-center p-6">
              <Award className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="font-bold mb-2">جودة عالية</h3>
              <p className="text-slate-600 text-sm">منتجات فاخرة بأعلى معايير الجودة</p>
            </Card>
            <Card className="text-center p-6">
              <Sparkles className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="font-bold mb-2">تخصيص كامل</h3>
              <p className="text-slate-600 text-sm">نطبع شعارك واسم شركتك على كل المنتجات</p>
            </Card>
            <Card className="text-center p-6">
              <Trophy className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="font-bold mb-2">خبرة واسعة</h3>
              <p className="text-slate-600 text-sm">أكثر من 10 سنوات في تجهيز الفعاليات</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="h-12 w-12 mx-auto text-purple-600 mb-4" />
              <h3 className="font-bold mb-2">دعم متواصل</h3>
              <p className="text-slate-600 text-sm">فريق متخصص لمساعدتك في كل خطوة</p>
            </Card>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  )
}
