import type { ComponentPropsWithoutRef } from 'react'

export default function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      className={`hover: rounded border border-gray-600 px-3 py-1.5 hover:bg-gray-800 active:bg-gray-700 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
