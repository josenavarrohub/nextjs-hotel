import SecondaryNavigation from '@/app/_components/SecondaryNavigation'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SecondaryNavigation />
      {children}
    </>
  )
}
