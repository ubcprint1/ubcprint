export type Role = 'admin' | 'manager' | 'employee' | 'viewer'

export interface Permission {
  resource: 'tasks' | 'machines' | 'attendance' | 'accounting' | 'users'
  actions: ('view' | 'create' | 'edit' | 'delete')[]
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  department?: string
  joinedAt: string
  status: 'active' | 'inactive'
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    { resource: 'tasks', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'machines', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'attendance', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'accounting', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'users', actions: ['view', 'create', 'edit', 'delete'] },
  ],
  manager: [
    { resource: 'tasks', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'machines', actions: ['view', 'create', 'edit'] },
    { resource: 'attendance', actions: ['view', 'create', 'edit'] },
    { resource: 'accounting', actions: ['view', 'create', 'edit'] },
    { resource: 'users', actions: ['view'] },
  ],
  employee: [
    { resource: 'tasks', actions: ['view', 'edit'] },
    { resource: 'machines', actions: ['view', 'edit'] },
    { resource: 'attendance', actions: ['view', 'create'] },
    { resource: 'accounting', actions: [] },
    { resource: 'users', actions: [] },
  ],
  viewer: [
    { resource: 'tasks', actions: ['view'] },
    { resource: 'machines', actions: ['view'] },
    { resource: 'attendance', actions: ['view'] },
    { resource: 'accounting', actions: [] },
    { resource: 'users', actions: [] },
  ],
}

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'مدير',
  manager: 'مشرف',
  employee: 'موظف',
  viewer: 'مراقب',
}
