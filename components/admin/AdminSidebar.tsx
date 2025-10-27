'use client'
import { useAppDispatch, useAppSelector } from '@/lib/rtk/hooks'
import { Section, setSection, fetchEntities } from '@/lib/rtk/adminSlice'
import type { RootState } from '@/lib/rtk/store'

const sections: { key: Section; label: string }[] = [
  { key: 'articles', label: 'Articles' },
  { key: 'categories', label: 'Categories' },
  { key: 'tags', label: 'Tags' },
  { key: 'authors', label: 'Authors' },
  { key: 'newsletter', label: 'Newsletter' },
]

export function AdminSidebar() {
  const dispatch = useAppDispatch()
  const current = useAppSelector((s: RootState) => s.admin.section)
  return (
    <aside className="w-full sm:w-56 border-r">
      <nav className="p-3 space-y-1">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => {
              dispatch(setSection(s.key))
              dispatch(fetchEntities())
            }}
            className={`w-full text-left rounded px-3 py-2 ${current === s.key ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-black/5'}`}
          >
            {s.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
