import Link from 'next/link'
import Image from 'next/image'

// Server Actions
import { signOutAction } from '@/app/_lib/action'

// Authentication
import { auth } from '@/app/_lib/auth'

const navLinks = [
  { href: '/rooms', label: 'Our Rooms' },
  { href: '/about', label: 'About Us' },
]

export default async function Navigation() {
  const session = await auth()

  return (
    <nav>
      <ul className='flex items-center space-x-4'>
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className='hover:text-secondary-400'>
              {link.label}
            </Link>
          </li>
        ))}
        {session?.user?.name ? (
          <li className='flex items-center space-x-2'>
            {session.user.image && (
              <Image
                className='rounded-full'
                src={session.user.image}
                alt='Avatar'
                width={32}
                height={32}
              />
            )}
            <Link href='/account/reservations' className='hover:text-secondary-400'>
              {session.user.name}
            </Link>
            <form action={signOutAction}>
              <button className='hover:text-secondary-400'>(Sign out)</button>
            </form>
          </li>
        ) : (
          <li>
            <Link href='/account' className='hover:text-secondary-400'>
              Your Account
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
