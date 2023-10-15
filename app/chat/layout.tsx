import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return <div className="bg-orange-500 p-10">{children}</div>
}
