import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  pages: {
    signOut: '../../index'
  },
  callbacks: {
    session: async (session, user) => {
       session.id = user.id
       return Promise.resolve(session)
    }
 },
  providers: [
    // Passwordless / email sign in
    Providers.Email({
      server: process.env.MAIL_SERVER,
      from: 'NextAuth.js <no-reply@example.com>'
    }),
    // OAuth authentication providers...
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      }),
  ],
  // Optional SQL or MongoDB database to persist users
  database: process.env.MONGODB_URI
})