import { useMemo, useState } from 'react'

import { groupByDate } from '@/common/util'
import { Chat } from '@/types/chat'

import ChatItem from './ChatItem'

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: '1',
      title: 'React',
      updateTime: Date.now()
    },
    {
      id: '2',
      title: '如何使用Next.js创建React项目123123123',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '3',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '4',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '5',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '6',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '7',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '8',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '9',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '10',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '11',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '12',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '13',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '14',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '15',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '16',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '17',
      title: '如何使用Next.js创建React项目',
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2
    },
    {
      id: '18',
      title: 'Next.js',
      updateTime: Date.now() + 2
    },
    {
      id: '19',
      title: 'Next.js',
      updateTime: Date.now() + 2
    },
    {
      id: '20',
      title: 'Next.js',
      updateTime: Date.now() + 2
    }
  ])

  const [selectedChat, setSelectedChat] = useState<Chat>()

  const groupList = useMemo(() => {
    return groupByDate(chatList)
  }, [chatList])
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
