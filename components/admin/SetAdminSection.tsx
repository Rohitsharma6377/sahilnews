'use client'
import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/rtk/hooks'
import { type Section, setSection, fetchEntities } from '@/lib/rtk/adminSlice'

export function SetAdminSection({ section }: { section: Section }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setSection(section))
    dispatch(fetchEntities())
  }, [dispatch, section])
  return null
}
