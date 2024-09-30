'use client'

import { useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { format, isFuture } from 'date-fns'
import { BookingWithRoom } from '@/types/booking'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function ReservationCard({
  booking,
  onDelete,
}: {
  booking: BookingWithRoom
  onDelete: any
}) {
  const isUpcoming = isFuture(new Date(booking.checkInDate))

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!confirm('Are you sure?')) return
    startTransition(() => onDelete(booking.id))
  }

  return (
    <div className='flex flex-col overflow-hidden rounded-lg bg-white shadow-md sm:flex-row'>
      <div className='h-48 w-full sm:h-48 sm:w-48'>
        <Link href={`/rooms/${booking.roomSlug}`}>
          <Image
            src={booking.roomImage}
            alt={booking.roomName}
            width={192}
            height={192}
            className='h-full w-full object-cover'
          />
        </Link>
      </div>
      <div className='flex flex-grow flex-col justify-between p-4'>
        <div>
          <div className='mb-2 flex items-start justify-between'>
            <h2 className='heading-3 mb-0'>{booking.roomName}</h2>
            <span
              className={`rounded px-2 py-1 text-xs font-semibold ${
                isUpcoming ? 'bg-green-100 text-green-800' : 'bg-grey-100 text-grey-800'
              }`}
            >
              {isUpcoming ? 'Upcoming' : 'Past'}
            </span>
          </div>
          <div className='mb-2 flex flex-col items-start gap-4 sm:flex-row sm:gap-9'>
            <div>
              <p className='mb-1 text-grey-600'>
                Check-in: {format(new Date(booking.checkInDate), 'd MMM, yyyy')}
              </p>
              <p className='mb-2 text-grey-600'>
                Check-out: {format(new Date(booking.checkOutDate), 'd MMM, yyyy')}
              </p>
              <p className='mb-2 text-sm text-grey-500 sm:mb-0'>
                Reserved on: {format(new Date(booking.createdAt), 'd MMM, yyyy')}
              </p>
            </div>
            <div>
              <p className='mb-1 text-grey-600'>Guests: {booking.numGuests}</p>
              <p className='mb-1 text-grey-600'>Total Price: ${booking.totalPrice}</p>
            </div>
          </div>
        </div>
        <div className='mt-4 flex justify-end sm:mt-0'>
          <div className='flex gap-2'>
            <Link
              href={`/account/reservations/edit/${booking.id}`}
              className='button-secondary-xs flex items-center gap-1'
            >
              <PencilSquareIcon className='h-5 w-5' /> Edit
            </Link>
            <button
              disabled={isPending}
              className='button-secondary-xs flex items-center gap-1 disabled:cursor-not-allowed'
              onClick={handleDelete}
            >
              <TrashIcon className='h-5 w-5' /> {isPending ? 'Deleting' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
