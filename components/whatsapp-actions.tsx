"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

interface WhatsAppActionsProps {
  phone: string
  message?: string
  label?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WhatsAppSendButton({
  phone,
  message = "",
  label = "إرسال عبر واتساب",
  variant = "outline",
  size = "default",
}: WhatsAppActionsProps) {
  const handleSendWhatsApp = () => {
    // تنظيف رقم الهاتف من أي رموز غير رقمية
    const cleanPhone = phone.replace(/\D/g, "")

    // إضافة كود مصر إذا لم يكن موجوداً
    const fullPhone = cleanPhone.startsWith("20") ? cleanPhone : `20${cleanPhone}`

    // ترميز الرسالة
    const encodedMessage = encodeURIComponent(message)

    // فتح واتساب
    const url = `https://wa.me/${fullPhone}${message ? `?text=${encodedMessage}` : ""}`
    window.open(url, "_blank")
  }

  return (
    <Button variant={variant} size={size} onClick={handleSendWhatsApp} className="gap-2">
      <MessageCircle className="h-4 w-4" />
      {size !== "icon" && label}
    </Button>
  )
}

interface WhatsAppInvoiceButtonProps {
  phone: string
  invoiceNumber: string
  customerName: string
  amount: number
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WhatsAppInvoiceButton({
  phone,
  invoiceNumber,
  customerName,
  amount,
  variant = "outline",
  size = "sm",
}: WhatsAppInvoiceButtonProps) {
  const message = `مرحباً ${customerName},

نود إرسال فاتورة رقم: ${invoiceNumber}
المبلغ المستحق: ${amount.toLocaleString()} جنيه مصري

نشكركم على تعاملكم معنا.
للاستفسار أو الدفع، يرجى التواصل معنا.

مع تحيات،
فريق إدارة المطبعة`

  return <WhatsAppSendButton phone={phone} message={message} label="إرسال الفاتورة" variant={variant} size={size} />
}
