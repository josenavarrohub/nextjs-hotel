import type { Metadata } from 'next'
import Link from 'next/link'
import Section from '@/app/_components/Section'
import { auth } from '@/app/_lib/auth'
import { getBookings } from '@/app/_lib/data-service'
import ReservationsList from '@/app/_components/ReservationsList'

// Metadata
export const metadata: Metadata = { title: 'Reservations' }

export default async function Page() {
  const session = await auth()
  const bookings = await getBookings(session?.user?.email!)

  return (
    <Section>
      <h1 className='heading-2 text-center'>Your reservations</h1>

      {bookings.length === 0 ? (
        <div className='text-center'>
          <p className='mb-16 text-lg'>You have no reservations yet.</p>
          <div>
            <Link className='button' href='/rooms'>
              See Our Rooms
            </Link>
          </div>
        </div>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </Section>
  )
}
