'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useState } from 'react'

type Machine = {
  id: number
  name: string
  model: string
  status: 'idle' | 'running' | 'maintenance' | 'broken'
}

const initialMachines: Machine[] = [
  { id: 1, name: 'آلة الطباعة الرقمية 1', model: 'HP Indigo', status: 'running' },
  { id: 2, name: 'آلة التجليد الأوتوماتيكية', model: 'Horizon BQ-270', status: 'running' },
  { id: 3, name: 'آلة الطباعة الأوفست', model: 'Heidelberg', status: 'idle' },
  { id: 4, name: 'آلة القص الليزري', model: 'Trotec Speedy', status: 'maintenance' },
  { id: 5, name: 'آلة الطباعة الرقمية 2', model: 'Xerox iGen', status: 'running' },
]

const statusColors = {
  idle: 'bg-muted text-muted-foreground hover:bg-muted',
  running: 'bg-chart-2/20 text-chart-2 hover:bg-chart-2/30',
  maintenance: 'bg-chart-4/20 text-chart-4 hover:bg-chart-4/30',
  broken: 'bg-destructive/20 text-destructive hover:bg-destructive/30',
}

const statusLabels = {
  idle: 'متوقفة',
  running: 'تعمل',
  maintenance: 'صيانة',
  broken: 'معطلة',
}

export function MachinesList() {
  const [machines] = useState<Machine[]>(initialMachines)

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">الآلات</h2>
        <Button size="sm" variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          إدارة
        </Button>
      </div>

      <div className="space-y-3">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{machine.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">الموديل: {machine.model}</p>
            </div>
            <Badge className={statusColors[machine.status]}>
              {statusLabels[machine.status]}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
