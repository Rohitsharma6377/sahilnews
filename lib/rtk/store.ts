import { configureStore } from '@reduxjs/toolkit'
import { adminReducer } from './adminSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      admin: adminReducer,
    },
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
