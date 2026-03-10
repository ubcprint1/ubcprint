"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, GitBranch, Users, TrendingUp, Filter, Calendar, AlertCircle } from "lucide-react"

export function MindmapImprovementsSummary() {
  const improvements = [
    {
      title: "عرض تفصيلي عند الضغط مرة واحدة",
      description:
        "عند الضغط على اسم الموظف، تظهر جميع مهامه في لوحة جانبية على نفس الصفحة مع إمكانية تحديث حالة كل مهمة",
      icon: Users,
      status: "مفعل",
    },
    {
      title: "الضغط المزدوج للتفاصيل الكاملة",
      description: "عند الضغط مرتين على الموظف أو المهمة، يتم الانتقال لصفحة منفصلة تحتوي على جميع التفاصيل والسجلات",
      icon: GitBranch,
      status: "مفعل",
    },
    {
      title: "مؤشرات الوقت الذكية",
      description: "عرض الوقت المتبقي لكل مهمة بألوان مختلفة (أخضر: أكثر من يوم، أصفر: ساعات، أحمر: متأخر)",
      icon: Calendar,
      status: "مفعل",
    },
    {
      title: "إدارة حالة المهام",
      description: "إمكانية تحديث حالة المهمة (تم/مؤجل/ملغي) مباشرة من المايند ماب مع إضافة سبب التأجيل أو الإلغاء",
      icon: TrendingUp,
      status: "مفعل",
    },
  ]

  const suggestions = [
    {
      title: "فلترة المهام حسب الحالة",
      description: "إضافة فلاتر لعرض المهام حسب حالتها (معلقة، مكتملة، متأخرة)",
      icon: Filter,
      priority: "عالية",
    },
    {
      title: "إحصائيات سريعة",
      description: "عرض إحصائيات في أعلى الصفحة توضح عدد المهام الكلي، المكتملة، المتأخرة لكل موظف",
      icon: TrendingUp,
      priority: "متوسطة",
    },
    {
      title: "تنبيهات ذكية",
      description: "إرسال تنبيهات تلقائية للموظفين عند اقتراب موعد تسليم المهمة",
      icon: AlertCircle,
      priority: "عالية",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold">التحسينات المطبقة على المايند ماب</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              تم تطوير المايند ماب ليصبح أكثر فعالية وسهولة في الاستخدام مع إضافة ميزات جديدة
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {improvements.map((improvement, index) => (
          <Card key={index} className="p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <improvement.icon className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{improvement.title}</h4>
                  <Badge variant="default" className="bg-emerald-500">
                    {improvement.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{improvement.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold">اقتراحات للتطوير المستقبلي</h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3 rounded-lg border border-border p-4">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <suggestion.icon className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{suggestion.title}</h4>
                  <Badge variant="secondary">{suggestion.priority}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/5 p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-blue-500/10 p-3">
            <Lightbulb className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">نصيحة للاستخدام الأمثل</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              استخدم المايند ماب للحصول على نظرة شاملة على توزيع المهام بين الموظفين. اضغط مرة واحدة على الموظف لمراجعة
              مهامه بسرعة، واضغط مرتين للحصول على التفاصيل الكاملة. يمكنك تحديث حالة المهام مباشرة من اللوحة الجانبية
              دون الحاجة للانتقال بين الصفحات.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
