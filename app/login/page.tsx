import type { Metadata } from 'next'

// Server Actions
import { signInAction } from '@/app/_lib/action'

// Components
import Section from '@/app/_components/Section'

// Metadata
export const metadata: Metadata = { title: 'Log in' }

export default async function Page() {
  return (
    <>
      <Section bgColor='grey' grow>
        <h1 className='heading-2 text-center lg:mb-14'>Log in</h1>
        <div className='text-center'>
          <p className='mb-10'>Please log in using your Google account:</p>
          <form action={signInAction}>
            <button className='button'>Log in with Google</button>
          </form>
        </div>
      </Section>
    </>
  )
}
