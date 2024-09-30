import { getRooms } from '@/app/_lib/data-service'
import RoomCard from '@/app/_components/RoomCard'

// Props
type Props = {
  capacity: string
}

export default async function RoomList({ capacity }: Props) {
  const rooms = await getRooms()

  const filteredRooms = capacity
    ? rooms.filter((room) => room.maxCapacity >= Number(capacity))
    : rooms

  if (!filteredRooms.length)
    return <p className='text-center'>No rooms available at the moment. Please check back later.</p>

  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
      {filteredRooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
