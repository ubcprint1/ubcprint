export interface Task {
  id: string
  title: string
  description?: string
  deadline: string // ISO date string
  status: 'pending' | 'completed' | 'postponed' | 'cancelled'
  postponeReason?: string
  cancelReason?: string
  assignedTo: string
  createdAt: string
}

export interface Employee {
  id: string
  name: string
  role: 'admin' | 'supervisor' | 'employee'
  color: string
  tasks: Task[]
}

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'admin',
    name: 'الإدارة',
    role: 'admin',
    color: '#ef4444',
    tasks: [],
  },
  {
    id: 'emp1',
    name: 'محمود شعراوي',
    role: 'supervisor',
    color: '#3b82f6',
    tasks: [
      {
        id: 't1',
        title: 'تصميم جديد',
        deadline: '2025-11-25T10:00:00',
        status: 'pending',
        assignedTo: 'emp1',
        createdAt: '2025-11-19T08:00:00',
      },
      {
        id: 't2',
        title: 'مراجعة التصاميم',
        deadline: '2025-11-26T14:00:00',
        status: 'completed',
        assignedTo: 'emp1',
        createdAt: '2025-11-18T09:00:00',
      },
      {
        id: 't3',
        title: 'تحديث العروض',
        deadline: '2025-11-27T16:00:00',
        status: 'postponed',
        postponeReason: 'في انتظار موافقة العميل',
        assignedTo: 'emp1',
        createdAt: '2025-11-17T11:00:00',
      },
    ],
  },
  {
    id: 'emp2',
    name: 'شيماء عمر',
    role: 'supervisor',
    color: '#f59e0b',
    tasks: [
      {
        id: 't4',
        title: 'طباعة الكتالوجات',
        deadline: '2025-11-28T12:00:00',
        status: 'pending',
        assignedTo: 'emp2',
        createdAt: '2025-11-19T07:00:00',
      },
      {
        id: 't5',
        title: 'إعداد ملفات الطباعة',
        deadline: '2025-11-29T15:00:00',
        status: 'pending',
        assignedTo: 'emp2',
        createdAt: '2025-11-18T10:00:00',
      },
    ],
  },
  {
    id: 'emp3',
    name: 'مصطفي عادل',
    role: 'employee',
    color: '#8b5cf6',
    tasks: [
      {
        id: 't6',
        title: 'تشغيل ماكينة الأوفست',
        deadline: '2025-11-24T18:00:00',
        status: 'completed',
        assignedTo: 'emp3',
        createdAt: '2025-11-19T06:00:00',
      },
      {
        id: 't7',
        title: 'صيانة دورية للماكينة',
        deadline: '2025-11-30T17:00:00',
        status: 'pending',
        assignedTo: 'emp3',
        createdAt: '2025-11-17T08:00:00',
      },
    ],
  },
  {
    id: 'emp4',
    name: 'ايهاب سعيد',
    role: 'employee',
    color: '#06b6d4',
    tasks: [
      {
        id: 't8',
        title: 'طباعة البنرات',
        deadline: '2025-11-23T11:00:00',
        status: 'cancelled',
        cancelReason: 'تم إلغاء الطلب من العميل',
        assignedTo: 'emp4',
        createdAt: '2025-11-16T09:00:00',
      },
      {
        id: 't9',
        title: 'تجهيز الاستيكرات',
        deadline: '2025-11-25T13:00:00',
        status: 'pending',
        assignedTo: 'emp4',
        createdAt: '2025-11-18T12:00:00',
      },
    ],
  },
  {
    id: 'emp5',
    name: 'مصطفي ابراهيم',
    role: 'employee',
    color: '#10b981',
    tasks: [
      {
        id: 't10',
        title: 'قص وتجليد الكتب',
        deadline: '2025-11-26T16:00:00',
        status: 'pending',
        assignedTo: 'emp5',
        createdAt: '2025-11-19T09:00:00',
      },
    ],
  },
  {
    id: 'emp6',
    name: 'انس عماد',
    role: 'employee',
    color: '#ec4899',
    tasks: [
      {
        id: 't11',
        title: 'تغليف المنتجات',
        deadline: '2025-11-27T14:00:00',
        status: 'pending',
        assignedTo: 'emp6',
        createdAt: '2025-11-18T11:00:00',
      },
      {
        id: 't12',
        title: 'تسليم الطلبات',
        deadline: '2025-11-28T10:00:00',
        status: 'pending',
        assignedTo: 'emp6',
        createdAt: '2025-11-19T08:00:00',
      },
    ],
  },
  {
    id: 'emp7',
    name: 'صابر سيد',
    role: 'employee',
    color: '#f97316',
    tasks: [
      {
        id: 't13',
        title: 'فحص جودة الطباعة',
        deadline: '2025-11-24T15:00:00',
        status: 'completed',
        assignedTo: 'emp7',
        createdAt: '2025-11-17T10:00:00',
      },
    ],
  },
  {
    id: 'emp8',
    name: 'ثابت احمد',
    role: 'employee',
    color: '#6366f1',
    tasks: [
      {
        id: 't14',
        title: 'تنظيف وصيانة الآلات',
        deadline: '2025-11-29T18:00:00',
        status: 'pending',
        assignedTo: 'emp8',
        createdAt: '2025-11-19T07:00:00',
      },
      {
        id: 't15',
        title: 'جرد المخزون',
        deadline: '2025-11-30T16:00:00',
        status: 'pending',
        assignedTo: 'emp8',
        createdAt: '2025-11-18T09:00:00',
      },
    ],
  },
]
