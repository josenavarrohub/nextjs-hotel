import type { ReactNode } from 'react'
import Container from '@/app/_components/Container'

export default function Section({
  children,
  bgColor = 'white',
  grow = false,
}: {
  children: ReactNode
  bgColor?: 'white' | 'grey'
  grow?: boolean
}) {
  const bgColorClass = bgColor === 'grey' ? 'bg-grey-100' : 'bg-white'
  const growClass = grow && 'flex-grow'

  return (
    <section className={`flex flex-col py-12 lg:py-20 ${bgColorClass} ${growClass}`}>
      <Container>{children}</Container>
    </section>
  )
}
