'use client'

import { useAppContext } from '@/components/AppContext'

import Menubar from './Menubar'
import Toolbar from './Toolbar'

export default function Index() {
  const {
    state: { displayNavigation }
  } = useAppContext()
  return (
    <nav
      className={`${
        displayNavigation ? '' : 'hidden'
      } dark relative h-full w-[260px] bg-gray-900 p-2 text-gray-300`}
    >
      <Menubar />
      <Toolbar />
    </nav>
  )
}
