import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill, PiStopBold } from 'react-icons/pi'
import TextareaAutoSize from 'react-textarea-autosize'

import { useAppContext } from '@/components/AppContext'
import { useEventBusContext } from '@/components/EventBusContext'
import Button from '@/components/common/Button'
import { ActionType } from '@/reducers/AppReducer'
import { Message, MessageRequestBody } from '@/types/chat'

export default function ChatInput() {
  const [messageText, setMessageText] = useState('')
  const stopRef = useRef(false)
  const chatIdRef = useRef('')
  const {
    state: { messageList, currentModel, streamingId, selectedChat },
    dispatch
  } = useAppContext()
  const { publish } = useEventBusContext()

  useEffect(() => {
    if (chatIdRef.current === selectedChat?.id) {
      return
    }
    chatIdRef.current = selectedChat?.id ?? ''
    stopRef.current = true
  }, [selectedChat])

  async function createOrUpdateMessage(message: Message) {
    const response = await fetch('/api/message/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    if (!response.ok) {
      console.log(response.statusText)
      return
    }
    const { data } = await response.json()
    if (!chatIdRef.current) {
      chatIdRef.current = data.message.chatId
      publish('fetchChatList')
      dispatch({
        type: ActionType.UPDATE,
        field: 'selectedChat',
        value: { id: chatIdRef.current }
      })
    }
    return data.message
  }

  async function deleteMessage(id: string) {
    const response = await fetch(`/api/message/delete?id=${id}`, {
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
    return code === 0
  }

  async function send() {
    const message = await createOrUpdateMessage({
      id: '',
      role: 'user',
      content: messageText,
      chatId: chatIdRef.current
    })
    const messages = [...messageList, message]
    dispatch({ type: ActionType.ADD_MESSAGE, message })
    doSend(messages)
  }

  async function resend() {
    const messages = [...messageList]
    if (messages.length !== 0 && messages[messages.length - 1].role === 'assistant') {
      const result = await deleteMessage(messages[messages.length - 1].id)
      if (result) {
        console.log('delete error')
        return
      }
      dispatch({
        type: ActionType.REMOVE_MESSAGE,
        message: messages[messages.length - 1]
      })
      messages.splice(messages.length - 1, 1)
    }
    doSend(messages)
  }

  async function doSend(messages: Message[]) {
    stopRef.current = false
    const body: MessageRequestBody = { messages, model: currentModel }
    setMessageText('')

    const controller = new AbortController()
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      console.log(response.statusText)
      return
    }
    if (!response.body) {
      console.log('body error')
      return
    }
    const responseMessage = await createOrUpdateMessage({
      id: '',
      role: 'assistant',
      content: '',
      chatId: chatIdRef.current
    })
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage })
    dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: responseMessage.id })
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let done = false
    let content = ''
    while (!done) {
      if (stopRef.current) {
        controller.abort()
        break
      }
      const result = await reader.read()
      done = result.done
      const chunk = decoder.decode(result.value)
      content += chunk
      dispatch({ type: ActionType.UPDATE_MESSAGE, message: { ...responseMessage, content } })
    }
    createOrUpdateMessage({ ...responseMessage, content })
    dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: '' })
  }

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 px-4">
        {messageList.length !== 0 &&
          (streamingId !== '' ? (
            <Button
              className="font-medium"
              icon={PiStopBold}
              variant="primary"
              onClick={() => {
                stopRef.current = true
              }}
            >
              停止生成
            </Button>
          ) : (
            <Button
              className="font-medium"
              icon={MdRefresh}
              variant="primary"
              onClick={() => {
                resend()
              }}
            >
              重新生成
            </Button>
          ))}
        <div className="flex w-full items-end rounded-lg border border-black/10 bg-white py-4 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:border-gray-800/50 dark:bg-gray-700">
          <div className="mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="mb-1.5 max-h-64 flex-1 resize-none border-0 bg-transparent text-black outline-none dark:text-white"
            placeholder="输入一条信息..."
            rows={1}
            value={messageText}
            onChange={e => setMessageText(e.target.value)}
          />
          <Button
            className="mx-3 !rounded-lg"
            icon={FiSend}
            variant="primary"
            disabled={messageText.trim() === '' || streamingId !== ''}
            onClick={() => send()}
          />
        </div>
        <footer className="px-4 pb-6 text-center text-sm text-gray-700 dark:text-gray-300">
          ©️{new Date().getFullYear()}&nbsp;{' '}
          <a
            className="animated-underline border-b border-dotted border-black/60 py-[1px] font-medium hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0"
            href="https://github.com/sunhaoxiang"
            target="_blank"
          >
            sunhaoxiang
          </a>
          .&nbsp;基于第三方提供的接口
        </footer>
      </div>
    </div>
  )
}
