import type { Metadata } from 'next'
import Section from '@/app/_components/Section'

// Metadata
export const metadata: Metadata = { title: 'Page not found' }

export default function Page() {
  return (
    <Section bgColor='grey' grow>
      <h1 className='heading-2 text-center'>Page not found</h1>
      <p className='text-center'>This page could not be found</p>
    </Section>
  )
}
