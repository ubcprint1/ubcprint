import { Suspense } from "react"
import { ClientLoginInner } from "@/components/auth/client-login-inner"

export const dynamic = "force-dynamic"

export default function ClientLoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center" dir="rtl">جاري تحميل صفحة الدخول...</div>}>
      <ClientLoginInner />
    </Suspense>
  )
}
