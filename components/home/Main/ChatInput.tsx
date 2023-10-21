import { FiSend } from 'react-icons/fi'
import { MdRefresh } from 'react-icons/md'
import { PiLightningFill } from 'react-icons/pi'
import TextareaAutoSize from 'react-textarea-autosize'

import Button from '@/components/common/Button'

export default function ChatInput() {
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
          />
          <Button className="mx-3 !rounded-lg" icon={FiSend} variant="primary" />
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
