'use client'

import { isSameDay, isBefore, startOfToday, differenceInDays } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'
import 'react-day-picker/style.css'
import { Room } from '@/types/room'
import { Settings } from '@/types/settings'
import { useRoomReservation } from '@/app/_contexts/RoomReservationContext'

export default function DatePicker({
  className,
  room,
  settings,
  bookedDates,
}: {
  className: string
  room: Room
  settings: Settings
  bookedDates: Date[]
}) {
  const { dates, setDates, clearDates } = useRoomReservation()
  const { minBookingLength, maxBookingLength } = settings
  const defaultClassNames = getDefaultClassNames()
  const { regularPrice, discount } = room
  const numNights =
    dates?.to && dates?.from ? Math.max(differenceInDays(dates.to, dates.from), 1) : 1
  const roomPrice = numNights * (regularPrice - discount)

  return (
    <div className={className}>
      <DayPicker
        selected={dates}
        onSelect={(dates) => setDates(dates)}
        min={minBookingLength + 1}
        max={maxBookingLength}
        mode='range'
        numberOfMonths={2}
        startMonth={new Date()}
        endMonth={new Date(new Date().getFullYear() + 3, 0)}
        disabled={(curDate) =>
          isBefore(curDate, startOfToday()) || bookedDates.some((date) => isSameDay(date, curDate))
        }
        captionLayout='dropdown'
        locale={enGB}
        classNames={{
          chevron: `${defaultClassNames.chevron} !fill-primary-800`,
        }}
      />

      {(dates?.from || dates?.to) && (
        <div className='flex items-center gap-2'>
          <p>
            Total: <span className='text-xl font-semibold text-primary-800'>{roomPrice}€</span>
          </p>

          <button className='button-secondary-xs' onClick={clearDates}>
            Clear dates
          </button>
        </div>
      )}
    </div>
  )
}
