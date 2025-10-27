'use client'
import { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/rtk/hooks'
import {
  deleteEntity,
  fetchEntities,
  setSelected,
  toggleFeatured,
  togglePublished,
} from '@/lib/rtk/adminSlice'
import type { RootState } from '@/lib/rtk/store'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Box, IconButton, Switch } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export function AdminList({ onEdit }: { onEdit: (id: string) => void }) {
  const dispatch = useAppDispatch()
  const { items, loading, section } = useAppSelector((s: RootState) => s.admin)

  useEffect(() => {
    dispatch(fetchEntities())
  }, [dispatch, section])

  const columns = useMemo<GridColDef[]>(() => {
    if (section === 'articles') {
      return [
        { field: 'title', headerName: 'Title', flex: 2, minWidth: 200 },
        { field: 'category', headerName: 'Category', flex: 1 },
        {
          field: 'tags',
          headerName: 'Tags',
          flex: 1,
          valueGetter: (p: any) =>
            Array.isArray((p.row as any).tags)
              ? (p.row as any).tags.join(', ')
              : '',
        },
        { field: 'authorName', headerName: 'Author', flex: 1 },
        {
          field: 'published',
          headerName: 'Published',
          width: 120,
          sortable: false,
          renderCell: (p: any) => (
            <Switch
              size="small"
              checked={!!(p.row as any).published}
              onChange={(e) =>
                (dispatch as any)(
                  togglePublished({
                    id: (p.row as any).slug || (p.row as any)._id,
                    value: e.target.checked,
                  })
                )
              }
            />
          ),
        },
        {
          field: 'featured',
          headerName: 'Featured',
          width: 110,
          sortable: false,
          renderCell: (p: any) => (
            <Switch
              size="small"
              checked={!!(p.row as any).featured}
              onChange={(e) =>
                (dispatch as any)(
                  toggleFeatured({
                    id: (p.row as any).slug || (p.row as any)._id,
                    value: e.target.checked,
                  })
                )
              }
            />
          ),
        },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (p: any) => (
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  ;(dispatch as any)(
                    setSelected((p.row as any).slug || (p.row as any)._id)
                  )
                  onEdit((p.row as any).slug || (p.row as any)._id)
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const id = String((p.row as any).slug || (p.row as any)._id)
                  if (confirm('Delete this item?'))
                    (dispatch as any)(deleteEntity(id))
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
        },
      ]
    }
    if (section === 'categories') {
      return [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (p: any) => (
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  ;(dispatch as any)(
                    setSelected((p.row as any).slug || (p.row as any)._id)
                  )
                  onEdit((p.row as any).slug || (p.row as any)._id)
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const id = String((p.row as any).slug || (p.row as any)._id)
                  if (confirm('Delete this item?'))
                    (dispatch as any)(deleteEntity(id))
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
        },
      ]
    }
    if (section === 'tags') {
      return [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (p: any) => (
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  ;(dispatch as any)(
                    setSelected((p.row as any).slug || (p.row as any)._id)
                  )
                  onEdit((p.row as any).slug || (p.row as any)._id)
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const id = String((p.row as any).slug || (p.row as any)._id)
                  if (confirm('Delete this item?'))
                    (dispatch as any)(deleteEntity(id))
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
        },
      ]
    }
    if (section === 'authors') {
      return [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'slug', headerName: 'Slug', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'role', headerName: 'Role', width: 120 },
        {
          field: 'actions',
          headerName: 'Actions',
          width: 120,
          sortable: false,
          filterable: false,
          renderCell: (p: any) => (
            <Box>
              <IconButton
                size="small"
                onClick={() => {
                  ;(dispatch as any)(
                    setSelected((p.row as any).slug || (p.row as any)._id)
                  )
                  onEdit((p.row as any).slug || (p.row as any)._id)
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  const id = String((p.row as any).slug || (p.row as any)._id)
                  if (confirm('Delete this item?'))
                    (dispatch as any)(deleteEntity(id))
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ),
        },
      ]
    }
    if (section === 'newsletter') {
      return [
        { field: 'email', headerName: 'Email', flex: 1 },
        {
          field: 'createdAt',
          headerName: 'Subscribed',
          width: 160,
          valueGetter: (p: any) =>
            new Date((p.row as any).createdAt).toLocaleString(),
        },
      ]
    }
    if (section === 'media') {
      return [
        { field: 'public_id', headerName: 'Public ID', flex: 1 },
        { field: 'resource_type', headerName: 'Type', width: 120 },
        { field: 'url', headerName: 'URL', flex: 1 },
      ]
    }
    return []
  }, [dispatch, section])

  return (
    <Box sx={{ mt: 2, height: 520, width: '100%' }}>
      <DataGrid
        rows={items || []}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.slug || row._id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  )
}
