import type { ComponentPropsWithoutRef } from 'react'

export default function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={`rounded border border-gray-600 px-3 py-1.5 ${className}`} {...props}>
      {children}
    </button>
  )
}
