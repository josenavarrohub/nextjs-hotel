import Container from '@/app/_components/Container'
import Logo from '@/app/_components/Logo'
import Navigation from '@/app/_components/Navigation'

export default function Header() {
  return (
    <header className='bg-primary-950 px-5 py-3 text-white'>
      <Container>
        <div className='flex flex-col items-center space-y-1 lg:flex-row lg:justify-between lg:space-y-0'>
          <Logo />
          <Navigation />
        </div>
      </Container>
    </header>
  )
}
