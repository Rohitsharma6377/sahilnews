'use client'
import { Provider } from 'react-redux'
import { makeStore } from './store'
import { useRef } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

export function AdminProviders({
  children,
  mode = 'light',
}: {
  children: React.ReactNode
  mode?: 'light' | 'dark'
}) {
  const storeRef = useRef<ReturnType<typeof makeStore>>()
  if (!storeRef.current) storeRef.current = makeStore()
  const theme = createTheme({
    palette: { mode },
    typography: {
      fontFamily:
        typeof window !== 'undefined'
          ? getComputedStyle(document.documentElement).getPropertyValue(
              '--font-sans'
            ) || undefined
          : undefined,
    },
  })
  return (
    <Provider store={storeRef.current}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  )
}
