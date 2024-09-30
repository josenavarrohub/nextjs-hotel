import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

// Services
import { getRoom, getRooms } from '@/app/_lib/data-service'

// Components
import Section from '@/app/_components/Section'
import Room from '@/app/_components/Room'
import RoomReservation from '@/app/_components/RoomReservation'
import Spinner from '@/app/_components/Spinner'

// Props
type Props = {
  params: { slug: string }
}

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const room = await getRoom(params.slug)
  return { title: room ? room.name : 'Page not found' }
}

// Generate static paths at build time for dynamic routes
export async function generateStaticParams() {
  const rooms = await getRooms()
  return rooms.map((room) => ({ slug: room.slug }))
}

export default async function page({ params }: Props) {
  const room = await getRoom(params.slug)
  if (!room) notFound()

  return (
    <Section bgColor='grey' grow>
      <h1 className='heading-2 text-center lg:mb-14'>{room.name}</h1>
      <Room room={room} />

      <Suspense fallback={<Spinner />}>
        <RoomReservation room={room} />
      </Suspense>
    </Section>
  )
}
