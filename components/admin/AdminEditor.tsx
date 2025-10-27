'use client'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/rtk/hooks'
import { createEntity, setSelected, updateEntity } from '@/lib/rtk/adminSlice'
import type { RootState } from '@/lib/rtk/store'

export function AdminEditor({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch()
  const { section, items, selectedId } = useAppSelector(
    (s) => s.admin as RootState['admin']
  )
  const editing = useMemo(
    () => items.find((x: any) => (x.slug || x._id) === selectedId),
    [items, selectedId]
  )

  const [form, setForm] = useState<any>({})
  useEffect(() => {
    setForm(editing || {})
  }, [editing])

  function set<K extends string>(k: K, v: any) {
    setForm((f: any) => ({ ...f, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (editing) {
      const id = String(editing.slug || editing._id)
      await dispatch(updateEntity({ id, data: form }))
    } else {
      await dispatch(createEntity(form))
    }
    dispatch(setSelected(null))
    onClose()
  }

  const fields: { key: string; label: string; type?: string }[] =
    section === 'articles'
      ? [
          { key: 'title', label: 'Title' },
          { key: 'slug', label: 'Slug' },
          { key: 'excerpt', label: 'Excerpt' },
          { key: 'category', label: 'Category' },
          { key: 'authorName', label: 'Author' },
          { key: 'featuredImg', label: 'Featured Image URL' },
        ]
      : section === 'categories'
        ? [
            { key: 'name', label: 'Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'description', label: 'Description' },
          ]
        : section === 'tags'
          ? [
              { key: 'name', label: 'Name' },
              { key: 'slug', label: 'Slug' },
            ]
          : section === 'authors'
            ? [
                { key: 'name', label: 'Name' },
                { key: 'slug', label: 'Slug' },
                { key: 'bio', label: 'Bio' },
                { key: 'avatar', label: 'Avatar URL' },
              ]
            : []

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold">
            {editing ? 'Edit' : 'Add'} {section}
          </div>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 text-sm hover:bg-black/5"
          >
            Close
          </button>
        </div>
        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          {fields.map((f) => (
            <div key={f.key} className="grid gap-1">
              <label className="text-sm text-slate-600">{f.label}</label>
              <input
                value={form[f.key] || ''}
                onChange={(e) => set(f.key, e.target.value)}
                className="rounded border px-3 py-2"
              />
            </div>
          ))}
          {section === 'articles' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => set('featured', e.target.checked)}
              />
              <span className="text-sm">Featured</span>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-base-accent text-white px-4 py-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
