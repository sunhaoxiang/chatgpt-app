'use client'

import { useAppContext } from '@/components/AppContext'
import Menubar from '@/components/home/Navigation/Menubar'

export default function Index() {
  const {
    state: { displayNavigation }
  } = useAppContext()
  return (
    <nav
      className={`${
        displayNavigation ? '' : 'hidden'
      } h-full w-[260px] bg-gray-900 p-2 text-gray-300`}
    >
      <Menubar />
    </nav>
  )
}
