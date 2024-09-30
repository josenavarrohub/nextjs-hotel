import Section from '@/app/_components/Section'
import Spinner from '@/app/_components/Spinner'

export default function Page() {
  return (
    <Section grow>
      <h1 className='heading-2 mb-8 text-center'>Loading...</h1>
      <Spinner />
    </Section>
  )
}
