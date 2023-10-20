import { useMemo, useState } from 'react'
import { MdOutlineTipsAndUpdates } from 'react-icons/md'

import Button from '@/components/common/Button'
import examples from '@/data/examples.json'

type ExampleType = {
  act: string
  prompt: string
}

export default function Example() {
  const [showFull, setShowFull] = useState(false)
  const list: ExampleType[] = useMemo(() => {
    if (showFull) {
      return examples
    } else {
      return examples.slice(0, 15)
    }
  }, [showFull])
  return (
    <>
      <div className="mb-4 mt-20 text-4xl">
        <MdOutlineTipsAndUpdates />
      </div>
      <ul className="flex flex-wrap justify-center gap-3.5">
        {list.map(item => {
          return (
            <li key={item.act}>
              <Button>{item.act}</Button>
            </li>
          )
        })}
      </ul>
      {!showFull && (
        <>
          <p className="p-2">...</p>
          <div className="flex w-full items-center space-x-2">
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
            <Button
              onClick={() => {
                setShowFull(true)
              }}
            >
              显示全部
            </Button>
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
          </div>
        </>
      )}
    </>
  )
}
