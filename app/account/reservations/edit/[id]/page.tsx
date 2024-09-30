import { notFound } from 'next/navigation'

// Actions
import { updateBooking } from '@/app/_lib/action'

// Services
import { getBooking } from '@/app/_lib/data-service'

// Components
import Section from '@/app/_components/Section'
import SubmitButton from '@/app/_components/SubmitButton'

// Props
type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const booking = await getBooking(Number(params.id))
  if (!booking) notFound()
  const { id, numGuests, roomMaxCapacity, observations } = booking

  return (
    <Section>
      <h1 className='heading-2 text-center'>Edit reservation</h1>

      <p className='mb-8 text-center text-lg'>
        Edit your reservations for <strong>{booking.roomName}</strong>
      </p>

      <form
        action={updateBooking}
        className='mx-auto flex max-w-2xl flex-col gap-6 rounded-lg bg-grey-100 px-12 py-8'
      >
        <input type='hidden' value={id} name='id' />

        <div className='space-y-2'>
          <label htmlFor='numGuests'>Number of guests</label>
          <select
            name='numGuests'
            defaultValue={numGuests}
            className='w-full rounded-sm bg-white px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-200'
            required
          >
            <option value='' key=''>
              Select...
            </option>
            {Array.from({ length: roomMaxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>Comments</label>
          <textarea
            name='observations'
            defaultValue={observations}
            className='w-full rounded-sm bg-white px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-200'
            placeholder='Allergies, pets...'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          <SubmitButton pendingLabel='Updating reservation...'>Update reservation</SubmitButton>
        </div>
      </form>
    </Section>
  )
}
