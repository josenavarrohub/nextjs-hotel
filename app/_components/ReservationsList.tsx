'use client'

import { useOptimistic } from 'react'

import { BookingWithRoom } from '@/types/booking'
import ReservationCard from './ReservationCard'
import { deleteBooking } from '../_lib/action'

export default function ReservationsList({ bookings }: { bookings: BookingWithRoom[] }) {
  const [optimisticBookings, optimisticDeleteBooking] = useOptimistic(bookings, (bookings, id) => {
    return bookings.filter((booking) => booking.id !== id)
  })

  async function handleDelete(id: number) {
    optimisticDeleteBooking(id)
    await deleteBooking(id)
  }

  return (
    <ul className='space-y-6'>
      {optimisticBookings.map((booking) => (
        <li key={booking.id}>
          <ReservationCard booking={booking} onDelete={handleDelete} />
        </li>
      ))}
    </ul>
  )
}
