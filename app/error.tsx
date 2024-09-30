'use client'

import { useEffect } from 'react'

import Section from '@/app/_components/Section'

type Props = {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section bgColor='grey' grow>
      <div className='text-center'>
        <h1 className='heading-2'>Something went wrong!</h1>
        <p className='mb-6'>{error.message}</p>
        <button onClick={() => reset()} className='button'>
          Try again
        </button>
      </div>
    </Section>
  )
}
