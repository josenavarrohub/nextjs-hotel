import { StarIcon } from '@heroicons/react/24/solid'

export default function Loading() {
  return (
    <div className='flex items-center justify-center space-x-4 pt-16'>
      <StarIcon className='h-8 w-8 animate-spin text-secondary-500' />
      <StarIcon className='h-8 w-8 animate-spin text-secondary-500' />
      <StarIcon className='h-8 w-8 animate-spin text-secondary-500' />
      <StarIcon className='h-8 w-8 animate-spin text-secondary-500' />
      <StarIcon className='h-8 w-8 animate-spin text-secondary-500' />
    </div>
  )
}
