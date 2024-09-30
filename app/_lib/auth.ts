import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import { createGuest, getGuest } from '@/app/_lib/data-service'

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user
    },
    async signIn({ user }) {
      try {
        if (user.email) {
          const guest = await getGuest(user.email)
          if (!guest) {
            await createGuest({
              nationalId: '',
              nationality: '',
              fullName: user.name || 'Guest',
              email: user.email,
              countryFlag: '',
            })
          }
        }
        return true
      } catch {
        return false
      }
    },
  },
  pages: {
    signIn: '/login',
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)
