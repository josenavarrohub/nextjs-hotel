import { getSettings, getBookedDates } from '@/app/_lib/data-service'

// Authentication
import { auth } from '@/app/_lib/auth'

// Components
import DatePicker from '@/app/_components/DatePicker'
import ReservationForm from '@/app/_components/ReservationForm'

// Types
import type { Room } from '@/types/room'
import type { User } from 'next-auth'

export default async function RoomReservation({ room }: { room: Room }) {
  const [settings, bookedDates] = await Promise.all([getSettings(), getBookedDates(room.id)])
  const session = await auth()

  return (
    <>
      <h2 className='heading-2 text-center'>Reserve this room</h2>
      <div className='flex flex-col overflow-hidden rounded-lg bg-white shadow-md 2xl:flex-row'>
        <DatePicker
          room={room}
          settings={settings}
          bookedDates={bookedDates}
          className='flex flex-1 basis-1/2 flex-col items-center justify-center p-10 2xl:p-8'
        />
        <ReservationForm room={room} user={session?.user as User} />
      </div>
    </>
  )
}
