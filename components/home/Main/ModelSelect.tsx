import { PiLightningFill, PiShootingStarFill } from 'react-icons/pi'

import { useAppContext } from '@/components/AppContext'
import { ActionType } from '@/reducers/AppReducer'

export default function ModelSelect() {
  const models = [
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5',
      icon: PiLightningFill
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      icon: PiShootingStarFill
    }
  ]

  const {
    state: { currentModel },
    dispatch
  } = useAppContext()

  return (
    <div className="flex rounded-xl bg-gray-100 p-1 dark:bg-gray-900">
      {models.map(item => {
        const selected = item.id === currentModel

        return (
          <button
            key={item.id}
            className={`group flex min-w-[148px] items-center justify-center space-x-2 rounded-lg border py-2.5 text-sm font-medium hover:text-gray-900 hover:dark:text-gray-100 ${
              selected
                ? 'border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100'
                : 'border-transparent text-gray-500'
            }`}
            onClick={() => {
              dispatch({
                type: ActionType.UPDATE,
                field: 'currentModel',
                value: item.id
              })
            }}
          >
            <span
              className={`group-hover:text=[#26cf8e] transition-colors duration-100 ${
                selected ? 'text-[#26cf8e]' : ''
              }`}
            >
              <item.icon />
            </span>
            <span className="transition-colors duration-100">{item.name}</span>
          </button>
        )
      })}
    </div>
  )
}
