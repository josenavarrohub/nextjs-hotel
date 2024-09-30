'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDaysIcon, UserIcon } from '@heroicons/react/24/solid'
import Container from '@/app/_components/Container'

const navLinks = [
  { href: '/account/reservations', label: 'Reservations', icon: CalendarDaysIcon },
  { href: '/account/profile', label: 'Guest Profile', icon: UserIcon },
]

export default function SecondaryNavigation() {
  const pathname = usePathname()

  return (
    <nav className='bg-grey-100'>
      <Container>
        <ul className='flex justify-center gap-4 py-3'>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-1 ${pathname === link.href && 'underline underline-offset-4'}`}
              >
                <link.icon className='h-4 w-4' />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  )
}
