import type { Room } from '@/types/room'

import Image from 'next/image'
import Link from 'next/link'
import { UsersIcon } from '@heroicons/react/24/solid'

export default function RoomCard({ room }: { room: Room }) {
  const { slug, name, description, maxCapacity, regularPrice, discount, image } = room
  const discountedPrice = regularPrice - discount
  const paragraphs = description.split('\n\n')

  return (
    <article className='flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md'>
      <div className='relative h-48 overflow-hidden md:h-56'>
        <Image
          src={image}
          alt={name}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='object-cover transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-90'
        />
      </div>
      <div className='flex flex-grow flex-col p-4 sm:p-6'>
        <h3 className='heading-3'>{name}</h3>
        <p className='mb-4 line-clamp-2 text-lg text-grey-500'>{paragraphs.at(0)}</p>
        <div className='mt-auto'>
          <div className='mb-4 flex items-center justify-between'>
            <span className='flex items-center gap-1 font-medium text-grey-500'>
              <UsersIcon className='h-4 w-4 flex-shrink-0' />
              <span>Up to {maxCapacity} guests</span>
            </span>
            <div className='text-right'>
              <span className='text-2xl font-bold text-primary-800'>{discountedPrice}€</span>
              {discount > 0 && (
                <span className='ml-2 text-sm text-red-800 line-through'>{regularPrice}€</span>
              )}
            </div>
          </div>
          <Link href={`/rooms/${slug}`} className='button block'>
            See room
          </Link>
        </div>
      </div>
    </article>
  )
}
