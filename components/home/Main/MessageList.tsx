import { useEffect } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { SiOpenai } from 'react-icons/si'

import { useAppContext } from '@/components/AppContext'
import Markdown from '@/components/common/Markdown'
import { ActionType } from '@/reducers/AppReducer'

export default function MessageList() {
  const {
    state: { messageList, streamingId, selectedChat },
    dispatch
  } = useAppContext()

  async function getData(chatId: string) {
    const response = await fetch(`/api/message/list?chatId=${chatId}`, {
      method: 'GET'
    })
    if (!response.ok) {
      console.log(response.statusText)
    }
    const { data } = await response.json()
    dispatch({ type: ActionType.UPDATE, field: 'messageList', value: data.list })
  }

  useEffect(() => {
    if (selectedChat) {
      getData(selectedChat.id)
    } else {
      dispatch({ type: ActionType.UPDATE, field: 'messageList', value: [] })
    }
  }, [selectedChat])

  return (
    <div className="w-full pb-48 pt-10 dark:text-gray-300">
      <ul>
        {messageList.map(message => {
          const isUser = message.role === 'user'
          return (
            <li
              key={message.id}
              className={`${isUser ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}`}
            >
              <div className="mx-auto flex w-full max-w-4xl space-x-6 px-4 py-6 text-lg">
                <div className="text-3xl leading-[1]">
                  {isUser ? <FaCircleUser /> : <SiOpenai />}
                </div>
                <div className="flex-1">
                  <Markdown>
                    {`${message.content}${message.id === streamingId ? '▍' : ''}`}
                  </Markdown>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
