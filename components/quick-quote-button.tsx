"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { QuickQuoteModal } from "./quick-quote-modal"

interface QuickQuoteButtonProps {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function QuickQuoteButton({ variant = "default", size = "default", className }: QuickQuoteButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setOpen(true)}>
        <MessageCircle className="h-4 w-4 ml-2" />
        اطلب عرض سعر
      </Button>
      <QuickQuoteModal open={open} onOpenChange={setOpen} />
    </>
  )
}
