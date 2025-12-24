import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    callbacks: {
        async signIn({ user }) {
            // Check if user email is in allowed list
            const allowedEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim());
            if (allowedEmails.length === 0 || allowedEmails[0] === "") {
                // No restriction if ADMIN_EMAILS is not set (development mode)
                return true;
            }
            return user.email ? allowedEmails.includes(user.email) : false;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt", // Use JWT instead of database sessions
    },
});
