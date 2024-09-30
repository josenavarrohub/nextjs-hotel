import type { Metadata } from 'next'
import Section from '@/app/_components/Section'

// Authentication
import { auth } from '@/app/_lib/auth'

// Metadata
export const metadata: Metadata = { title: 'Account' }

export default async function Page() {
  const session = await auth()
  const name = session?.user?.name?.split(' ').at(0)

  return (
    <Section>
      <h1 className='heading-2 text-nowrap text-center'>Welcome, {name}</h1>
    </Section>
  )
}
