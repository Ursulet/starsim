import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./prisma";
import { verifyPassword } from "@/server/auth/password";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Parola", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const email = parsed.data.email.toLowerCase();
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.status !== "ACTIVE") return null;
        const ok = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!ok) return null;
        await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
        return { id: user.id, email: user.email, name: user.name, role: user.role, status: user.status };
      }
    })
  ],
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;
      if (pathname.startsWith("/admin/login")) return true;
      if (pathname.startsWith("/admin")) {
        const user = auth?.user;
        return Boolean(user && user.status === "ACTIVE" && (user.role === "ADMIN" || user.role === "EDITOR"));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.status = (user as { status: string }).status;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "EDITOR" | "VOLUNTEER";
        session.user.status = token.status as "ACTIVE" | "DISABLED";
      }
      return session;
    }
  }
});
