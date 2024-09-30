import { Suspense } from 'react'
import type { Metadata } from 'next'

// Components
import Section from '@/app/_components/Section'
import RoomList from '@/app/_components/RoomList'
import Spinner from '@/app/_components/Spinner'
import CapacityFilter from '@/app/_components/CapacityFilter'

// Props
type Props = {
  searchParams: { capacity: string }
}

// Metadata
export const metadata: Metadata = { title: 'Rooms' }

export default function Page({ searchParams }: Props) {
  const { capacity } = searchParams

  return (
    <Section bgColor='grey' grow>
      <h1 className='heading-2 text-center lg:mb-10'>Discover Our Luxurious Rooms</h1>

      <CapacityFilter />

      <Suspense fallback={<Spinner />} key={capacity}>
        <RoomList capacity={capacity} />
      </Suspense>
    </Section>
  )
}
