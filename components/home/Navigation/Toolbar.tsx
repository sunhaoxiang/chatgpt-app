import { MdDarkMode, MdInfo, MdLightMode } from 'react-icons/md'

import { useAppContext } from '@/components/AppContext'
import Button from '@/components/common/Button'
import { ActionType } from '@/reducers/AppReducer'

export default function Index() {
  const {
    state: { themeMode },
    dispatch
  } = useAppContext()

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between bg-gray-800 p-2">
      <Button
        icon={themeMode === 'dark' ? MdDarkMode : MdLightMode}
        variant="text"
        onClick={() => {
          dispatch({
            type: ActionType.UPDATE,
            field: 'themeMode',
            value: themeMode === 'dark' ? 'light' : 'dark'
          })
        }}
      />
      <Button icon={MdInfo} variant="text" />
    </div>
  )
}
