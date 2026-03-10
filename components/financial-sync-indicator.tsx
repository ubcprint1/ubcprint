"use client"

import { useEffect, useState } from "react"
import { useFinancialStore } from "@/lib/financial-store"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

export function FinancialSyncIndicator() {
  const [status, setStatus] = useState<"synced" | "checking" | "error">("synced")
  const [errors, setErrors] = useState<string[]>([])
  const validateConsistency = useFinancialStore((state) => state.validateConsistency)
  const transactions = useFinancialStore((state) => state.transactions)

  useEffect(() => {
    setStatus("checking")

    const result = validateConsistency()

    setTimeout(() => {
      if (result.valid) {
        setStatus("synced")
        setErrors([])
      } else {
        setStatus("error")
        setErrors(result.errors)
      }
    }, 500)
  }, [transactions, validateConsistency])

  if (status === "synced") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <CheckCircle className="w-4 h-4" />
        <span>البيانات متسقة ومحدثة</span>
      </div>
    )
  }

  if (status === "checking") {
    return (
      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span>جاري التحقق من البيانات...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
        <AlertCircle className="w-4 h-4" />
        <span>تم اكتشاف تعارض في البيانات</span>
      </div>
      {errors.length > 0 && (
        <div className="text-xs bg-red-50 dark:bg-red-950 p-2 rounded">
          {errors.map((error, i) => (
            <div key={i}>• {error}</div>
          ))}
        </div>
      )}
    </div>
  )
}
