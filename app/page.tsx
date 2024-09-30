import Image from 'next/image'
import Link from 'next/link'

// Static import (Build-Time)
import homeImage from '@/public/home/1.jpg'

export default function Page() {
  return (
    <section className='relative flex-grow'>
      <Image
        className='object-cover'
        placeholder='blur'
        src={homeImage}
        alt='Room'
        fill
        quality={80}
        priority
      />
      <div className='absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-6'>
        <h1 className='heading-1 mb-3 text-center text-white'>Welcome to Our Luxury Hotel</h1>
        <p className='mb-6 text-center text-lg text-white lg:text-2xl'>
          Experience unparalleled comfort and elegance
        </p>
        <Link href='/rooms' className='button'>
          See Our Rooms
        </Link>
      </div>
    </section>
  )
}
