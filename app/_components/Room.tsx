import Image from 'next/image'
import { UsersIcon } from '@heroicons/react/24/solid'
import ReadMore from '@/app/_components/ReadMore'
import { Room as RoomType } from '@/types/room'

export default function Room({ room }: { room: RoomType }) {
  const { name, description, maxCapacity, regularPrice, discount, image } = room
  const discountedPrice = regularPrice - discount

  return (
    <article className='mb-16 overflow-hidden rounded-lg bg-white shadow-md lg:mb-24 lg:flex lg:h-[400px]'>
      <div className='relative h-64 overflow-hidden lg:h-full lg:w-1/2'>
        <Image
          priority
          src={image}
          alt={name}
          fill
          className='object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-90'
        />
      </div>

      <div className='flex flex-grow flex-col p-4 sm:p-6 lg:w-1/2 xl:w-1/3'>
        <div className='mb-5'>
          <p className='mb-4 text-lg leading-relaxed'>
            <ReadMore>{description}</ReadMore>
          </p>
        </div>

        <div className='mb-5 grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-1 text-lg text-grey-500'>
            <UsersIcon className='h-4 w-4' /> <span>Up to {maxCapacity} guests</span>
          </div>
        </div>

        <div className='mb-7'>
          <span className='text-3xl font-bold'>
            Price: <span className='text-primary-800'>{discountedPrice}€</span>
          </span>
          {discount > 0 && (
            <span className='ml-2 text-lg text-red-800 line-through'>{regularPrice}€</span>
          )}
        </div>
      </div>
    </article>
  )
}
