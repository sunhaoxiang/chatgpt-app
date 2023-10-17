'use client'

import { useAppContext } from '@/components/AppContext'

import ChatList from './ChatList'
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
      } dark relative flex h-full w-[260px] flex-col bg-gray-900 p-2 text-gray-300`}
    >
      <Menubar />
      <ChatList />
      <Toolbar />
    </nav>
  )
}
