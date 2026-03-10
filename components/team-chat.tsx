"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Paperclip } from "lucide-react"
import { MOCK_EMPLOYEES } from "@/lib/employees-data"
import type { ChatMessage } from "@/lib/chat-types"

const MOCK_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    senderId: "1",
    senderName: "محمود شعراوي",
    message: "صباح الخير، هل انتهيت من طلب شركة النور؟",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
  },
  {
    id: "2",
    senderId: "2",
    senderName: "شيماء عمر",
    message: "نعم، انتهيت منه. جاهز للتسليم",
    timestamp: new Date(Date.now() - 3000000).toISOString(),
    read: true,
  },
  {
    id: "3",
    senderId: "3",
    senderName: "مصطفي عادل",
    message: "ماكينة الليزر تحتاج صيانة عاجلة",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    read: false,
  },
]

export function TeamChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentUserId = "admin"

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: "أنا",
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: true,
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "منذ دقائق"
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString("ar-EG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    } else {
      return date.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "short",
      })
    }
  }

  return (
    <Card className="flex h-[600px] flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <CardTitle>الشات الجماعي</CardTitle>
          <span className="text-sm text-muted-foreground">({MOCK_EMPLOYEES.length} موظف)</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.senderId === currentUserId
              return (
                <div key={message.id} className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-xs">{message.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col gap-1 ${isOwnMessage ? "items-end" : "items-start"}`}>
                    <span className="text-xs font-medium text-muted-foreground">{message.senderName}</span>
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        isOwnMessage ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="اكتب رسالتك..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
