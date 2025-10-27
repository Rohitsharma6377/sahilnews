'use client'
import { useState } from 'react'
import { AdminToolbar } from './AdminToolbar'
import { AdminList } from './AdminList'
import { AdminEditor } from './AdminEditor'

export function AdminDashboard() {
  const [editorOpen, setEditorOpen] = useState(false)
  return (
    <div className="grid gap-6">
      <AdminToolbar onAdd={() => setEditorOpen(true)} />
      <AdminList onEdit={() => setEditorOpen(true)} />
      {editorOpen && <AdminEditor onClose={() => setEditorOpen(false)} />}
    </div>
  )
}
