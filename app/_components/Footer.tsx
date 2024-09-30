import Container from '@/app/_components/Container'

export default function Footer() {
  const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME
  const currentYear = new Date().getFullYear()

  return (
    <footer className='mt-auto bg-primary-950 px-5 py-2 text-center text-sm text-white'>
      <Container>
        <p>
          &copy; {currentYear} {projectName} | All rights reserved
        </p>
      </Container>
    </footer>
  )
}
