import type { Metadata } from 'next'

// Components
import Section from '@/app/_components/Section'
import ProfileForm from '@/app/_components/ProfileForm'
import SelectCountry from '@/app/_components/SelectCountry'
import { auth } from '@/app/_lib/auth'
import { getGuest } from '@/app/_lib/data-service'

// Metadata
export const metadata: Metadata = { title: 'Profile' }

export default async function Page() {
  const session = await auth()
  if (!session?.user?.email) return null
  const guest = await getGuest(session.user.email)

  return (
    <Section>
      <h1 className='heading-2 text-center'>Enhance Your Guest Profile</h1>

      <p className='mb-8 text-center text-lg'>
        Sharing the details below will streamline your check-in process and save you time!
      </p>

      <ProfileForm
        guest={guest!}
        selectCountry={
          <SelectCountry
            name='nationality'
            className='w-full rounded-sm bg-white px-5 py-3 shadow-sm'
            defaultValue={guest?.nationality!}
          />
        }
      />
    </Section>
  )
}
