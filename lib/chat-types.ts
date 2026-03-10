export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  read: boolean
  attachments?: string[]
}

export interface ChatRoom {
  id: string
  name: string
  type: "group" | "direct"
  participants: string[]
  lastMessage?: ChatMessage
  unreadCount: number
}
