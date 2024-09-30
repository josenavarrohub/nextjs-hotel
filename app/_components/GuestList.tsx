import { getGuests } from '@/app/_lib/data-service'

export default async function GuestList() {
  const guests = await getGuests()

  if (!guests?.length)
    return (
      <p className='text-center'>No guests available at the moment. Please check back later.</p>
    )

  return (
    <div className='rounded-sm bg-white p-4 text-lg'>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.fullName} ({guest.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
