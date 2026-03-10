"use client"

import { ArrowRight, Download, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/accounting">
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">عرض الفاتورة</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => {
              const BOM = "\uFEFF"
              const content = `${BOM}${"═".repeat(50)}
فاتورة رقم INV-2024-001
${"═".repeat(50)}
التاريخ: 2024-11-01

بيانات الشركة:
مطبعة UBC Print
القاهرة، مصر
الهاتف: 01036930965

بيانات العميل:
شركة الأعمال المتقدمة
الهاتف: 01036930965

${"─".repeat(50)}
الوصف          | الكمية | السعر  | الإجمالي
طباعة كتيبات A4 | 1000  | 5 ج.م  | 5,000 ج.م
${"─".repeat(50)}
المجموع الفرعي: 8,000 ج.م
الضريبة (14%): 1,200 ج.م
الإجمالي: 9,200 ج.م
${"═".repeat(50)}
`
              const blob = new Blob([content], { type: "text/plain;charset=utf-8;" })
              const url = URL.createObjectURL(blob)
              const a = document.createElement("a")
              a.href = url
              a.download = "فاتورة-INV-2024-001.txt"
              a.click()
              URL.revokeObjectURL(url)
            }}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "فاتورة INV-2024-001", text: "فاتورة - شركة الأعمال المتقدمة - 9,200 ج.م" })
              }
            }}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold">فاتورة رقم INV-2024-001</h2>
                <p className="text-muted-foreground">التاريخ: 2024-11-01</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">بيانات الشركة</h3>
                  <p className="text-sm text-muted-foreground">
                    مطبعة UBC Print
                    <br />
                    العنوان: القاهرة، مصر
                    <br />
                    الهاتف: 01036930965
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">بيانات العميل</h3>
                  <p className="text-sm text-muted-foreground">
                    شركة الأعمال المتقدمة
                    <br />
                    الهاتف: 01036930965
                  </p>
                </div>
              </div>

              <div className="rounded-lg border">
                <table className="w-full">
                  <thead className="bg-accent">
                    <tr>
                      <th className="p-3 text-right">الوصف</th>
                      <th className="p-3 text-center">الكمية</th>
                      <th className="p-3 text-center">السعر</th>
                      <th className="p-3 text-left">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">طباعة كتيبات A4</td>
                      <td className="p-3 text-center">1000</td>
                      <td className="p-3 text-center">5 ج.م</td>
                      <td className="p-3 text-left font-medium">5,000 ج.م</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>8,000 ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الضريبة (14%):</span>
                    <span>1,200 ج.م</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-lg font-bold">
                    <span>الإجمالي:</span>
                    <span className="text-primary">9,200 ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
