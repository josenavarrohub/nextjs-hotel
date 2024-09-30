'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

export default function SubmitButton({
  children,
  pendingLabel,
}: {
  children: React.ReactNode
  pendingLabel: string
}) {
  const { pending } = useFormStatus()

  return (
    <button className='button w-full disabled:bg-grey-500' type='submit' disabled={pending}>
      {pending ? pendingLabel : children}
    </button>
  )
}
