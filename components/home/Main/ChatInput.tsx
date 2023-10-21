import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill } from 'react-icons/pi'
import TextareaAutoSize from 'react-textarea-autosize'
import { v4 as uuidV4 } from 'uuid'

import { useAppContext } from '@/components/AppContext'
import Button from '@/components/common/Button'
import { ActionType } from '@/reducers/AppReducer'
import { Message, MessageRequestBody } from '@/types/chat'

export default function ChatInput() {
  const [messageText, setMessageText] = useState('')
  const {
    state: { messageList, currentModel },
    dispatch
  } = useAppContext()

  async function send() {
    const message: Message = {
      id: uuidV4(),
      role: 'user',
      content: messageText
    }
    const messages = [...messageList, message]
    const body: MessageRequestBody = { messages, model: currentModel }
    dispatch({ type: ActionType.ADD_MESSAGE, message })
    setMessageText('')
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
    const responseMessage: Message = {
      id: uuidV4(),
      role: 'assistant',
      content: ''
    }
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage })
    dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: responseMessage.id })
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let done = false
    let content = ''
    while (!done) {
      const result = await reader.read()
      done = result.done
      const chunk = decoder.decode(result.value)
      content += chunk
      dispatch({ type: ActionType.UPDATE_MESSAGE, message: { ...responseMessage, content } })
    }
    dispatch({ type: ActionType.UPDATE, field: 'streamingId', value: '' })
  }

  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 px-4">
        <Button className="font-medium" icon={MdRefresh} variant="primary">
          重新生成
        </Button>
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
