'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import React from 'react'

const capacityButtons = [
  { value: null, label: 'Any' },
  { value: '2', label: '2 guests' },
  { value: '3', label: '3 guests' },
  { value: '4', label: '4 guests' },
]

export default function CapacityFilter() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const capacity = searchParams.get('capacity')

  const handleFilter = (value: null | string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    value === null ? newSearchParams.delete('capacity') : newSearchParams.set('capacity', value)
    router.push(`?${newSearchParams}`, { scroll: false })
  }

  return (
    <div className='mb-6 flex items-center justify-end gap-2'>
      <span className='mr-2'>Capacity: </span>
      {capacityButtons.map(({ value, label }) => (
        <button
          key={value ?? 'any'}
          onClick={() => handleFilter(value)}
          className={`button-secondary-xs ${capacity === value && 'bg-grey-300'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
