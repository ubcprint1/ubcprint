'use client'

import { useState } from 'react'
import { Search, X, FileText, Wrench, Users, DollarSign, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface SearchResult {
  id: string
  type: 'task' | 'machine' | 'user' | 'invoice' | 'attendance'
  title: string
  description: string
  link: string
}

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    type: 'task',
    title: 'طباعة 1000 كتيب',
    description: 'مهمة قيد التنفيذ - العميل: شركة الأعمال',
    link: '/tasks/1',
  },
  {
    id: '2',
    type: 'machine',
    title: 'آلة الطباعة الرقمية',
    description: 'تعمل - آخر صيانة: 2024-10-15',
    link: '/maintenance',
  },
  {
    id: '3',
    type: 'user',
    title: 'محمد علي',
    description: 'موظف - قسم الطباعة',
    link: '/users',
  },
  {
    id: '4',
    type: 'invoice',
    title: 'INV-2024-001',
    description: 'فاتورة مدفوعة - 9,200 ر.س',
    link: '/accounting',
  },
]

const typeIcons = {
  task: FileText,
  machine: Wrench,
  user: Users,
  invoice: DollarSign,
  attendance: Clock,
}

const typeColors = {
  task: 'text-blue-500',
  machine: 'text-amber-500',
  user: 'text-purple-500',
  invoice: 'text-emerald-500',
  attendance: 'text-slate-500',
}

const typeLabels = {
  task: 'مهمة',
  machine: 'آلة',
  user: 'مستخدم',
  invoice: 'فاتورة',
  attendance: 'حضور',
}

interface GlobalSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (value.length > 0) {
      // Mock search - في التطبيق الحقيقي سيتم البحث في قاعدة البيانات
      setResults(
        MOCK_RESULTS.filter(
          (item) =>
            item.title.includes(value) || item.description.includes(value)
        )
      )
    } else {
      setResults([])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>البحث في النظام</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث عن مهام، آلات، موظفين، فواتير..."
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-background py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearch('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {results.length > 0 && (
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {results.map((result) => {
                const Icon = typeIcons[result.type]
                return (
                  <button
                    key={result.id}
                    onClick={() => {
                      onOpenChange(false)
                      // Navigate to result.link
                    }}
                    className="flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3 text-right transition-colors hover:bg-accent"
                  >
                    <div
                      className={`rounded-lg bg-accent p-2 ${typeColors[result.type]}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{result.title}</p>
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-muted-foreground">
                          {typeLabels[result.type]}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              لا توجد نتائج للبحث عن "{query}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
