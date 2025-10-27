import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  type ActionReducerMapBuilder,
} from '@reduxjs/toolkit'

export type Section =
  | 'articles'
  | 'categories'
  | 'tags'
  | 'authors'
  | 'newsletter'
  | 'media'

export type AdminState = {
  section: Section
  search: string
  loading: boolean
  items: any[]
  meta: { total: number }
  selectedId: string | null
}

const initialState: AdminState = {
  section: 'articles',
  search: '',
  loading: false,
  items: [],
  meta: { total: 0 },
  selectedId: null,
}

export const fetchEntities = createAsyncThunk<
  any[],
  void,
  { state: { admin: AdminState } }
>('admin/fetchEntities', async (_arg: void, { getState }) => {
  const { section, search } = getState().admin
  if (section === 'articles') {
    const res = await fetch(
      `/api/articles${search ? `?q=${encodeURIComponent(search)}` : ''}`
    )
    return await res.json()
  }
  if (section === 'categories') {
    const res = await fetch('/api/categories')
    return await res.json()
  }
  if (section === 'tags') {
    const res = await fetch('/api/tags')
    return await res.json()
  }
  if (section === 'authors') {
    const res = await fetch('/api/authors')
    return await res.json()
  }
  if (section === 'newsletter') {
    const res = await fetch('/api/newsletter')
    return await res.json()
  }
  if (section === 'media') {
    const res = await fetch('/api/media')
    const data = await res.json()
    return Array.isArray((data as any).items) ? (data as any).items : []
  }
  return []
})

export const createEntity = createAsyncThunk<
  any,
  any,
  { state: { admin: AdminState } }
>('admin/createEntity', async (payload: any, { getState }) => {
  const { section } = getState().admin
  if (section === 'articles') {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  }
  if (section === 'categories') {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  }
  if (section === 'tags') {
    const res = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  }
  if (section === 'authors') {
    const res = await fetch('/api/authors', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  }
  return null as any
})

export const updateEntity = createAsyncThunk<
  any,
  { id: string; data: any },
  { state: { admin: AdminState } }
>('admin/updateEntity', async ({ id, data }, { getState }) => {
  const { section } = getState().admin
  if (section === 'articles') {
    const res = await fetch(`/api/articles/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await res.json()
  }
  if (section === 'categories') {
    const res = await fetch(`/api/categories/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await res.json()
  }
  if (section === 'tags') {
    const res = await fetch(`/api/tags/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await res.json()
  }
  if (section === 'authors') {
    const res = await fetch(`/api/authors/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data),
    })
    return await res.json()
  }
  return null as any
})

export const deleteEntity = createAsyncThunk<
  string,
  string,
  { state: { admin: AdminState } }
>('admin/deleteEntity', async (id, { getState }) => {
  const { section } = getState().admin
  let url = ''
  if (section === 'articles') url = `/api/articles/${encodeURIComponent(id)}`
  if (section === 'categories')
    url = `/api/categories/${encodeURIComponent(id)}`
  if (section === 'tags') url = `/api/tags/${encodeURIComponent(id)}`
  if (section === 'authors') url = `/api/authors/${encodeURIComponent(id)}`
  await fetch(url, { method: 'DELETE' })
  return id
})

export const toggleFeatured = createAsyncThunk<
  any,
  { id: string; value: boolean }
>('admin/toggleFeatured', async ({ id, value }) => {
  const res = await fetch(`/api/articles/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ featured: value }),
  })
  return await res.json()
})

export const togglePublished = createAsyncThunk<
  any,
  { id: string; value: boolean }
>('admin/togglePublished', async ({ id, value }) => {
  const res = await fetch(`/api/articles/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ published: value }),
  })
  return await res.json()
})

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setSection(state: AdminState, action: PayloadAction<Section>) {
      state.section = action.payload
      state.items = []
      state.selectedId = null
    },
    setSearch(state: AdminState, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setSelected(state: AdminState, action: PayloadAction<string | null>) {
      state.selectedId = action.payload
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AdminState>) => {
    builder
      .addCase(fetchEntities.pending, (state: AdminState) => {
        state.loading = true
      })
      .addCase(
        fetchEntities.fulfilled,
        (state: AdminState, action: PayloadAction<any[]>) => {
          state.loading = false
          state.items = Array.isArray(action.payload) ? action.payload : []
          state.meta.total = state.items.length
        }
      )
      .addCase(fetchEntities.rejected, (state: AdminState) => {
        state.loading = false
      })
      .addCase(
        createEntity.fulfilled,
        (state: AdminState, action: PayloadAction<any>) => {
          if (action.payload) state.items.unshift(action.payload)
        }
      )
      .addCase(
        updateEntity.fulfilled,
        (state: AdminState, action: PayloadAction<any>) => {
          const updated = action.payload
          if (!updated) return
          const key = 'slug'
          const i = state.items.findIndex((x: any) => x[key] === updated[key])
          if (i >= 0) state.items[i] = updated
        }
      )
      .addCase(
        deleteEntity.fulfilled,
        (state: AdminState, action: PayloadAction<string>) => {
          const id = action.payload
          const key = 'slug'
          state.items = state.items.filter((x: any) => x[key] !== id)
        }
      )
      .addCase(
        toggleFeatured.fulfilled,
        (state: AdminState, action: PayloadAction<any>) => {
          const updated = action.payload
          if (!updated) return
          const i = state.items.findIndex((x: any) => x.slug === updated.slug)
          if (i >= 0) state.items[i] = updated
        }
      )
      .addCase(
        togglePublished.fulfilled,
        (state: AdminState, action: PayloadAction<any>) => {
          const updated = action.payload
          if (!updated) return
          const i = state.items.findIndex((x: any) => x.slug === updated.slug)
          if (i >= 0) state.items[i] = updated
        }
      )
  },
})

export const { setSection, setSearch, setSelected } = adminSlice.actions
export const adminReducer = adminSlice.reducer
