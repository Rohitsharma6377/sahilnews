'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/rtk/hooks'
import { fetchEntities, setSearch } from '@/lib/rtk/adminSlice'
import { Button, TextField } from '@mui/material'

export function AdminToolbar({ onAdd }: { onAdd: () => void }) {
  const dispatch = useAppDispatch()
  const { search, section } = useAppSelector((s: any) => s.admin) as any
  const [local, setLocal] = useState(search)
  const fileRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => setLocal(search), [search])

  const debounced = useMemo(() => {
    let t: any
    return (v: string) => {
      clearTimeout(t)
      t = setTimeout(() => {
        ;(dispatch as any)(setSearch(v))(dispatch as any)(fetchEntities())
      }, 300)
    }
  }, [dispatch])

  async function onUpload(file: File) {
    const fd = new FormData()
    fd.set('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) (dispatch as any)(fetchEntities())
  }

  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-2">
      <TextField
        size="small"
        value={local}
        onChange={(e) => {
          setLocal(e.target.value)
          debounced(e.target.value)
        }}
        placeholder="Search..."
        className="flex-1"
      />
      {section === 'media' ? (
        <>
          <input
            ref={fileRef}
            type="file"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) onUpload(f)
            }}
          />
          <Button variant="contained" onClick={() => fileRef.current?.click()}>
            Upload
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={onAdd}>
          Add New
        </Button>
      )}
    </div>
  )
}
