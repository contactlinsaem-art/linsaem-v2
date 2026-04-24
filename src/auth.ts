import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { neon } from "@neondatabase/serverless";

function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || "";
  return neon(url);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        try {
          const sql = getDb();
          const rows = await sql`
            SELECT * FROM clients WHERE email = ${credentials.email as string} LIMIT 1
          `;
          if (!rows[0]) return null;
          // En production : utiliser bcrypt pour comparer le mot de passe
          // const valid = await bcrypt.compare(credentials.password, rows[0].password_hash);
          return {
            id: rows[0].id,
            email: rows[0].email,
            name: rows[0].name,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
