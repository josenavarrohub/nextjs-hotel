'use client'

import React from 'react'
import Image from 'next/image'

// Server Actions
import { updateProfile } from '@/app/_lib/action'

// Components
import SubmitButton from '@/app/_components/SubmitButton'

// Types
import { Guest } from '@/types/guest'

export default function ProfileForm({
  guest,
  selectCountry,
}: {
  guest: Guest
  selectCountry: React.ReactNode
}) {
  const { fullName, email, nationalId, countryFlag } = guest

  return (
    <form
      action={updateProfile}
      className='mx-auto flex max-w-2xl flex-col gap-6 rounded-lg bg-grey-100 px-12 py-8'
    >
      <div className='space-y-2'>
        <label>Full name</label>
        <input
          name='fullName'
          defaultValue={fullName}
          disabled
          className='w-full rounded-sm bg-white px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-200'
        />
      </div>

      <div className='space-y-2'>
        <label>Email address</label>
        <input
          name='email'
          defaultValue={email}
          disabled
          className='w-full rounded-sm bg-white px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-200'
        />
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationality' className='flex gap-2'>
          Nationality
          <Image src={countryFlag} alt='Country flag' width={30} height={30} />
        </label>
        {selectCountry}
      </div>

      <div className='space-y-2'>
        <label htmlFor='nationalId'>National ID number</label>
        <input
          name='nationalId'
          defaultValue={nationalId}
          className='w-full rounded-sm bg-white px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
        />
      </div>

      <div className='flex items-center justify-end gap-6'>
        <SubmitButton pendingLabel='Updating profile...'>Update profile</SubmitButton>
      </div>
    </form>
  )
}
