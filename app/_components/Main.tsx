import type { ReactNode } from 'react'

export default function Main({ children }: { children: ReactNode }) {
  return <main className='flex h-full flex-grow flex-col'>{children}</main>
}
