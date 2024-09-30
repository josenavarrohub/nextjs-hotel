'use client'

import { Room } from '@/types/room'
import { useRoomReservation } from '@/app/_contexts/RoomReservationContext'
import SubmitButton from '@/app/_components/SubmitButton'
import type { User } from 'next-auth'
import Link from 'next/link'
import { differenceInDays } from 'date-fns'
import { addBooking } from '@/app/_lib/action'

export default function ReservationForm({ room, user }: { room: Room; user: User }) {
  const { id, maxCapacity, regularPrice, discount } = room
  const { dates, clearDates } = useRoomReservation()
  const checkInDate = dates?.from
  const checkOutDate = dates?.to
  const numNights =
    dates?.to && dates?.from ? Math.max(differenceInDays(dates.to, dates.from), 1) : 1
  const roomPrice = numNights * (regularPrice - discount)

  // Booking data is bound to the Server Action
  const bookingData = {
    checkInDate,
    checkOutDate,
    numNights,
    roomPrice,
    roomId: id,
  }

  const addBookingWithData = addBooking.bind(null, bookingData)

  return (
    <div className='flex-1 basis-1/2'>
      <div className='flex flex-col items-center justify-between bg-primary-900 px-16 py-2 text-white'>
        {user?.name ? <p>Guest: {user?.name}</p> : <p>Book now</p>}
      </div>

      <form
        action={async (formData) => {
          await addBookingWithData(formData)
          clearDates()
        }}
        className='flex h-full flex-col gap-5 bg-secondary-50 p-10 text-lg'
      >
        {user?.name ? (
          <>
            {/* Number of guests */}
            <div className='space-y-2'>
              <label htmlFor='numGuests'>Number of guests</label>
              <select name='numGuests' className='w-full rounded-sm px-5 py-3 shadow-sm' required>
                <option value='' key=''>
                  Select...
                </option>
                {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                  <option value={x} key={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            {/* Observations */}
            <div className='space-y-2'>
              <label htmlFor='observations'>Comments</label>
              <textarea
                name='observations'
                className='w-full rounded-sm px-5 py-3 shadow-sm'
                placeholder='Allergies, pets...'
              />
            </div>
            {checkInDate && checkOutDate && (
              <SubmitButton pendingLabel='Reserving...'>Reserve now</SubmitButton>
            )}
          </>
        ) : (
          <div className='mx-auto max-w-96'>
            <p className='mb-6'>Please log in to reserve the room</p>
            <p>
              {' '}
              <Link href='/account/reservations' className='button block'>
                log in
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
