'use client'
import * as React from 'react'
import Link from 'next/link'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  Divider,
  Switch,
  InputBase,
  alpha,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch } from '@/lib/rtk/hooks'
import { setSearch } from '@/lib/rtk/adminSlice'
import { AdminProviders } from '@/lib/rtk/Providers'

const drawerWidth = 240

const nav = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/categoryTag', label: 'Categories & Tags' },
  { href: '/admin/author', label: 'Authors' },
  { href: '/admin/file-orgnizer', label: 'Files' },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [dark, setDark] = React.useState(false)
  const dispatch = useAppDispatch()
  const [q, setQ] = React.useState('')
  const onSearch = React.useMemo(() => {
    let t: any
    return (v: string) => {
      clearTimeout(t)
      t = setTimeout(() => {
        dispatch(setSearch(v))
      }, 300)
    }
  }, [dispatch])

  return (
    <AdminProviders mode={dark ? 'dark' : 'light'}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Admin
            </Typography>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 1,
                backgroundColor: (theme) =>
                  alpha(theme.palette.common.white, 0.15),
                '&:hover': {
                  backgroundColor: (theme) =>
                    alpha(theme.palette.common.white, 0.25),
                },
                mr: 2,
                width: { xs: '50%', sm: 300 },
              }}
            >
              <Box
                sx={{
                  p: '6px',
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon />
              </Box>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ color: 'inherit', pl: 4, width: '100%' }}
                value={q}
                onChange={(e) => {
                  setQ(e.target.value)
                  onSearch(e.target.value)
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2">Dark</Typography>
              <Switch checked={dark} onChange={() => setDark((d) => !d)} />
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="admin navigation"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <Toolbar />
            <Divider />
            <List>
              {nav.map((n) => (
                <ListItemButton
                  key={n.href}
                  component={Link}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                >
                  <ListItemText primary={n.label} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <Toolbar />
            <Divider />
            <List>
              {nav.map((n) => (
                <ListItemButton key={n.href} component={Link} href={n.href}>
                  <ListItemText primary={n.label} />
                </ListItemButton>
              ))}
            </List>
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AdminProviders>
  )
}
