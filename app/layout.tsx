import type { Metadata } from 'next'

// Providers
import { RoomReservationProvider } from '@/app/_contexts/RoomReservationContext'

// Components
import Header from '@/app/_components/Header'
import Main from '@/app/_components/Main'
import Footer from '@/app/_components/Footer'

// Styles
import '@/app/_styles/globals.css'

// Fonts
import { Inter, Playfair_Display } from 'next/font/google'

const fontPrimary = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
})

const fontSecondary = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
})

const fontVariables = `${fontPrimary.variable} ${fontSecondary.variable}`

// Metadata
export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_PROJECT_NAME as string,
    template: `%s | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body className={`${fontVariables} flex min-h-dvh flex-col antialiased`}>
        <Header />
        <Main>
          <RoomReservationProvider>{children}</RoomReservationProvider>
        </Main>
        <Footer />
      </body>
    </html>
  )
}
