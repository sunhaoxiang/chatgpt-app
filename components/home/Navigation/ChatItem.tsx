import { MouseEvent, useEffect, useState } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdCheck, MdClose, MdDeleteOutline } from 'react-icons/md'
import { PiChatBold, PiTrashBold } from 'react-icons/pi'

import { useEventBusContext } from '@/components/EventBusContext'
import { Chat } from '@/types/chat'

type Props = {
  item: Chat
  selected: boolean
  onSelected: (item: Chat) => void
}

export default function ChatItem({ item, selected, onSelected }: Props) {
  const { publish } = useEventBusContext()
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [title, setTitle] = useState(item.title)

  useEffect(() => {
    setEditing(false)
    setDeleting(false)
  }, [selected])

  async function updateChat() {
    const response = await fetch('/api/chat/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: item.id, title })
    })
    if (!response.ok) {
      console.log(response.statusText)
      return
    }
    const { code } = await response.json()
    if (code === 0) {
      publish('fetchChatList')
    }
  }

  async function deleteChat() {
    const response = await fetch(`/api/chat/delete?id=${item.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      console.log(response.statusText)
      return
    }
    const { code } = await response.json()
    if (code === 0) {
      publish('fetchChatList')
    }
  }

  return (
    <li
      key={item.id}
      className={`group relative flex cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-800 ${
        selected ? 'bg-gray-800 pr-[3.5em]' : ''
      }`}
      onClick={() => onSelected(item)}
    >
      <div>{deleting ? <PiTrashBold /> : <PiChatBold />}</div>

      {editing ? (
        <input
          className="min-w-0 flex-1 bg-transparent outline-none"
          value={title}
          autoFocus={true}
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
      ) : (
        <div className="relative flex-1 overflow-hidden whitespace-nowrap">
          {item.title}
          <span
            className={`absolute inset-y-0 right-0 w-8 bg-gradient-to-l group-hover:from-gray-800 ${
              selected ? 'from-gray-800' : 'from-gray-900'
            }`}
          ></span>
        </div>
      )}

      {selected && (
        <div className="absolute right-1 flex">
          {editing || deleting ? (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={(e: MouseEvent) => {
                  e.preventDefault()
                  if (deleting) {
                    deleteChat()
                  } else {
                    updateChat()
                  }
                  setEditing(false)
                  setDeleting(false)
                }}
              >
                <MdCheck />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={(e: MouseEvent) => {
                  e.preventDefault()
                  setEditing(false)
                  setDeleting(false)
                }}
              >
                <MdClose />
              </button>
            </>
          ) : (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={(e: MouseEvent) => {
                  e.preventDefault()
                  setEditing(true)
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={(e: MouseEvent) => {
                  e.preventDefault()
                  setDeleting(true)
                }}
              >
                <MdDeleteOutline />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  )
}
