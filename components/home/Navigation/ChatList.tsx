import { useEffect, useMemo, useRef, useState } from 'react'

import { groupByDate } from '@/common/util'
import { useAppContext } from '@/components/AppContext'
import { EventListener, useEventBusContext } from '@/components/EventBusContext'
import { ActionType } from '@/reducers/AppReducer'
import { Chat } from '@/types/chat'

import ChatItem from './ChatItem'

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([])

  const pageRef = useRef(1)

  const groupList = useMemo(() => {
    return groupByDate(chatList)
  }, [chatList])

  const {
    state: { selectedChat },
    dispatch
  } = useAppContext()

  const { subscribe, unsubscribe } = useEventBusContext()

  const loadMoreRef = useRef(null)
  const hasMoreRef = useRef(false)
  const loadingRef = useRef(false)

  async function getData() {
    if (loadingRef.current) {
      return
    }
    loadingRef.current = true
    const response = await fetch(`/api/chat/list?page=${pageRef.current}`, {
      method: 'GET'
    })
    if (!response.ok) {
      console.log(response.statusText)
      loadingRef.current = false
    }
    const { data } = await response.json()
    hasMoreRef.current = data.hasMore
    if (pageRef.current === 1) {
      setChatList(data.list)
    } else {
      setChatList(list => [...list, ...data.list])
    }
    pageRef.current++
    loadingRef.current = false
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

  useEffect(() => {
    let observer: IntersectionObserver | null = null
    let div = loadMoreRef.current
    if (div) {
      observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreRef.current) {
          getData()
        }
      })
      observer.observe(div)
    }
    return () => {
      if (observer && div) {
        observer.unobserve(div)
      }
    }
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
                    onSelected={chat =>
                      dispatch({ type: ActionType.UPDATE, field: 'selectedChat', value: chat })
                    }
                  />
                )
              })}
            </ul>
          </div>
        )
      })}
      <div ref={loadMoreRef}>&nbsp;</div>
    </div>
  )
}
