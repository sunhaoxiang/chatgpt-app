'use client'

import type { Dispatch, ReactNode } from 'react'
import { createContext, useContext, useMemo, useReducer } from 'react'

import { Action, initState, reducer, State } from '@/reducers/AppReducer'

type AppContextProps = {
  state: State
  dispatch: Dispatch<Action>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState)
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
