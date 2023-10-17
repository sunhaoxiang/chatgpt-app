'use client'

import type { Dispatch, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type State = {
  displayNavigation: boolean
  themeMode: 'light' | 'dark'
}

type AppContextProps = {
  state: State
  setState: Dispatch<SetStateAction<State>>
}

const AppContext = createContext<AppContextProps>(null!)

export function useAppContext() {
  return useContext(AppContext)
}

export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    displayNavigation: true,
    themeMode: 'light'
  })
  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}
