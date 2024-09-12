import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomPrismaAdapter = PrismaAdapter(prisma) as any;

export const authOptions: AuthOptions = {
  adapter: {
    ...CustomPrismaAdapter,
    //     createUser: (data) => {
    //       return prisma.user.create({
    //         data: {
    //           ...data,
    //           isAdmin: false,
    //           // email: data.email ?? undefined,
    //           name: data.name
    //           // image: data.image ?? undefined,
    //         },
    //       });
    //     },
  }, // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "johnsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/vendor/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
