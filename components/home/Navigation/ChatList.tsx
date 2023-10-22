import { useEffect, useMemo, useRef, useState } from 'react'

import { groupByDate } from '@/common/util'
import { EventListener, useEventBusContext } from '@/components/EventBusContext'
import { Chat } from '@/types/chat'

import ChatItem from './ChatItem'

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([])

  const pageRef = useRef(1)

  const [selectedChat, setSelectedChat] = useState<Chat>()

  const groupList = useMemo(() => {
    return groupByDate(chatList)
  }, [chatList])

  const { subscribe, unsubscribe } = useEventBusContext()

  async function getData() {
    const response = await fetch(`/api/chat/list?page=${pageRef.current}`, {
      method: 'GET'
    })
    if (!response.ok) {
      console.log(response.statusText)
    }
    const { data } = await response.json()
    if (pageRef.current === 1) {
      setChatList(data.list)
    } else {
      setChatList(list => [...list, ...data.list])
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const callback: EventListener = () => {
      pageRef.current = 1
      getData()
    }
    subscribe('fetchChatList', callback)
    return () => unsubscribe('fetchChatList', callback)
  }, [])

  return (
    <div className="mb-[48px] mt-2 flex flex-1 flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 bg-gray-900 p-3 text-sm text-gray-500">{date}</div>
            <ul>
              {list.map(item => {
                const selected = selectedChat?.id === item.id

                return (
                  <ChatItem
                    key={item.id}
                    item={item}
                    selected={selected}
                    onSelected={chat => setSelectedChat(chat)}
                  />
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
