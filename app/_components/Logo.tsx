import Link from 'next/link'
import { StarIcon } from '@heroicons/react/24/outline'

export default function Logo() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME

  return (
    <Link href='/' className='flex items-center space-x-1'>
      <StarIcon className='h-8 w-8 -rotate-12 text-secondary-500' />
      <span className='font-secondary text-2xl font-bold'>{projectName}</span>
    </Link>
  )
}
