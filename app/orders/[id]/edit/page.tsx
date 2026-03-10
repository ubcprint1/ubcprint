"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Plus, Trash2, Package, ListOrdered, Save } from "lucide-react"
import Link from "next/link"
import { EMPLOYEES } from "@/lib/employees-data"
import { ORDER_STAGES_CONFIG, type OrderStage } from "@/lib/orders-types"
import { useOrdersStore } from "@/lib/orders-store"

interface ProductWithStages {
  productName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  notes: string
  stages: { stage: string; assignedTo: string; notes?: string }[]
}

export default function EditOrderPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { getOrderById, updateOrder } = useOrdersStore()
  const order = getOrderById(id)

  const [formData, setFormData] = useState({
    customerName: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    paidAmount: "",
    deliveryDate: "",
  })

  const [products, setProducts] = useState<ProductWithStages[]>([
    {
      productName: "",
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      notes: "",
      stages: [{ stage: "design", assignedTo: "" }],
    },
  ])

  useEffect(() => {
    if (order) {
      // استخدام expectedDelivery أو deliveryDate حسب ما هو متوفر
      const deliveryDate = (order as any).deliveryDate || order.expectedDelivery || ""
      
      setFormData({
        customerName: order.customerName || "",
        description: order.description || "",
        priority: order.priority || "medium",
        paidAmount: (order.paidAmount ?? 0).toString(),
        deliveryDate: deliveryDate,
      })

      if (order.products && order.products.length > 0) {
        setProducts(
          order.products.map((p) => ({
            productName: p.productName || "",
            quantity: p.quantity ?? 1,
            unitPrice: p.unitPrice ?? 0,
            totalPrice: p.totalPrice ?? 0,
            notes: p.notes || "",
            stages: p.stages?.map((s) => ({
              stage: s.stage || "design",
              assignedTo: s.assignedTo || "",
              notes: s.notes || "",
            })) || [{ stage: "design", assignedTo: "" }],
          }))
        )
      } else {
        // إذا لم توجد منتجات، استخدم البيانات من الطلب مباشرة
        const orderAny = order as any
        if (orderAny.productName) {
          setProducts([{
            productName: orderAny.productName || "",
            quantity: orderAny.quantity ?? 1,
            unitPrice: orderAny.totalCost ? (orderAny.totalCost / (orderAny.quantity || 1)) : 0,
            totalPrice: orderAny.totalCost ?? 0,
            notes: "",
            stages: [{ stage: order.currentStage || "design", assignedTo: "" }],
          }])
        }
      }
    }
  }, [order])

  if (!order) {
    return (
      <div className="min-h-screen bg-background p-6" dir="rtl">
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">الطلب غير موجود</p>
          <Link href="/orders">
            <Button className="mt-4">العودة للطلبات</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const calculateTotalCost = () => {
    return products.reduce((sum, product) => sum + product.totalPrice, 0)
  }

  const addProduct = () => {
    setProducts([
      ...products,
      {
        productName: "",
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
        notes: "",
        stages: [{ stage: "design", assignedTo: "" }],
      },
    ])
  }

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index))
    }
  }

  const updateProduct = (index: number, field: keyof Omit<ProductWithStages, "stages">, value: any) => {
    const newProducts = [...products]
    newProducts[index] = { ...newProducts[index], [field]: value }

    if (field === "quantity" || field === "unitPrice") {
      const quantity = field === "quantity" ? Number(value) : newProducts[index].quantity
      const unitPrice = field === "unitPrice" ? Number(value) : newProducts[index].unitPrice
      newProducts[index].totalPrice = quantity * unitPrice
    }

    setProducts(newProducts)
  }

  const addStageToProduct = (productIndex: number) => {
    const newProducts = [...products]
    newProducts[productIndex].stages.push({ stage: "production", assignedTo: "" })
    setProducts(newProducts)
  }

  const removeStageFromProduct = (productIndex: number, stageIndex: number) => {
    const newProducts = [...products]
    if (newProducts[productIndex].stages.length > 1) {
      newProducts[productIndex].stages = newProducts[productIndex].stages.filter((_, i) => i !== stageIndex)
      setProducts(newProducts)
    }
  }

  const updateProductStage = (
    productIndex: number,
    stageIndex: number,
    field: string,
    value: any,
  ) => {
    const newProducts = [...products]
    newProducts[productIndex].stages[stageIndex] = {
      ...newProducts[productIndex].stages[stageIndex],
      [field]: value,
    }
    setProducts(newProducts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const totalCost = calculateTotalCost()
    const productNames = products.map((p) => p.productName).join(", ")
    const totalQuantity = products.reduce((sum, p) => sum + Number(p.quantity), 0)
    
    updateOrder(id, {
      customerName: formData.customerName,
      description: formData.description,
      priority: formData.priority,
      paidAmount: Number(formData.paidAmount) || 0,
      expectedDelivery: formData.deliveryDate,
      deliveryDate: formData.deliveryDate,
      productName: productNames,
      quantity: totalQuantity,
      products: products.map((p) => ({
        id: `prod-${Date.now()}-${Math.random()}`,
        productName: p.productName,
        quantity: Number(p.quantity),
        unitPrice: Number(p.unitPrice),
        totalPrice: p.totalPrice,
        notes: p.notes,
        stages: p.stages.map((s) => ({
          stageId: `s-${Date.now()}-${Math.random()}`,
          stage: s.stage as any,
          assignedTo: s.assignedTo,
          assignedToName: EMPLOYEES.find((e) => e.id === s.assignedTo)?.name || "",
          startDate: new Date().toISOString(),
          expectedEndDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          status: "pending" as const,
          notes: s.notes,
        })),
      })),
      totalCost: totalCost,
    } as any)
    
    router.push(`/orders/${id}`)
  }

  const availableStages: OrderStage[] = ["design", "approval", "production", "quality", "packaging", "delivery"]

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <Card className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">تعديل الطلب - {order.orderNumber}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* معلومات الطلب */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">معلومات الطلب</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="customerName">اسم العميل *</Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="أدخل اسم العميل"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryDate">موعد التسليم *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  required
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">الأولوية *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="urgent">عاجل</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paidAmount">المبلغ المدفوع (ج.م)</Label>
                <Input
                  id="paidAmount"
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الطلب والملاحظات</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="أدخل وصف تفصيلي للطلب، المواصفات، والملاحظات الخاصة"
                rows={3}
              />
            </div>
          </div>

          {/* المنتجات ومراحل العمل */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Package className="h-5 w-5" />
                المنتجات ومراحل العمل
              </h2>
              <Button type="button" variant="outline" size="sm" onClick={addProduct} className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                إضافة منتج
              </Button>
            </div>

            <div className="space-y-4">
              {products.map((product, productIndex) => (
                <Card key={productIndex} className="p-4 bg-muted/30 border-2">
                  <div className="space-y-4">
                    {/* معلومات المنتج */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label>اسم المنتج *</Label>
                        <Input
                          required
                          value={product.productName}
                          onChange={(e) => updateProduct(productIndex, "productName", e.target.value)}
                          placeholder="أدخل اسم المنتج"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>الكمية *</Label>
                        <Input
                          type="number"
                          required
                          value={product.quantity}
                          onChange={(e) => updateProduct(productIndex, "quantity", e.target.value)}
                          placeholder="0"
                          min="1"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>سعر الوحدة (ج.م) *</Label>
                        <Input
                          type="number"
                          required
                          value={product.unitPrice}
                          onChange={(e) => updateProduct(productIndex, "unitPrice", e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>السعر الإجمالي (ج.م)</Label>
                        <Input type="number" value={product.totalPrice.toFixed(2)} disabled className="bg-muted" />
                      </div>

                      <div className="space-y-2">
                        <Label>ملاحظات</Label>
                        <Input
                          value={product.notes}
                          onChange={(e) => updateProduct(productIndex, "notes", e.target.value)}
                          placeholder="ملاحظات خاصة بالمنتج (اختياري)"
                        />
                      </div>
                    </div>

                    {/* مراحل العمل الخاصة بالمنتج */}
                    <div className="space-y-3 border-t pt-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          <ListOrdered className="h-4 w-4" />
                          مراحل العمل لهذا المنتج
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addStageToProduct(productIndex)}
                          className="gap-2 bg-transparent h-8"
                        >
                          <Plus className="h-3 w-3" />
                          إضافة مرحلة
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {product.stages.map((stage, stageIndex) => (
                          <Card key={stageIndex} className="p-3 bg-background">
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                              <div className="space-y-2">
                                <Label className="text-xs">المرحلة *</Label>
                                <Select
                                  value={stage.stage}
                                  onValueChange={(value: OrderStage) =>
                                    updateProductStage(productIndex, stageIndex, "stage", value)
                                  }
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableStages.map((s) => (
                                      <SelectItem key={s} value={s}>
                                        {ORDER_STAGES_CONFIG[s].label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-xs">الموظف المسؤول *</Label>
                                <Select
                                  value={stage.assignedTo}
                                  onValueChange={(value) =>
                                    updateProductStage(productIndex, stageIndex, "assignedTo", value)
                                  }
                                >
                                  <SelectTrigger className="h-9">
                                    <SelectValue placeholder="اختر الموظف" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {EMPLOYEES.map((emp) => (
                                      <SelectItem key={emp.id} value={emp.id}>
                                        {emp.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-end gap-2">
                                <div className="flex-1 space-y-2">
                                  <Label className="text-xs">ملاحظات</Label>
                                  <Input
                                    value={stage.notes || ""}
                                    onChange={(e) =>
                                      updateProductStage(productIndex, stageIndex, "notes", e.target.value)
                                    }
                                    placeholder="ملاحظات (اختياري)"
                                    className="h-9"
                                  />
                                </div>
                                {product.stages.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeStageFromProduct(productIndex, stageIndex)}
                                    className="text-red-500 hover:bg-red-50 hover:text-red-600 h-9 w-9"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* زر حذف المنتج */}
                    {products.length > 1 && (
                      <div className="flex justify-end border-t pt-3">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProduct(productIndex)}
                          className="gap-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          حذف المنتج
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-primary/5">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">التكلفة الإجمالية للطلب:</span>
                <span className="text-2xl font-bold text-primary">{calculateTotalCost().toFixed(2)} ج.م</span>
              </div>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1 gap-2">
              <Save className="h-4 w-4" />
              حفظ التعديلات
            </Button>
            <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
              إلغاء
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
