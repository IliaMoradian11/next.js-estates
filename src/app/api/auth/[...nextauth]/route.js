import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { comparePasswords } from "@/utils/auth";

const handler = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("مشکلی پیش آمد، لطفا مجددا امتحان کنید");
        }

        const isConnected = await connectDB()
        if (!isConnected) {
          throw new Error("مشکلی در سرور پیش آمد")
        }

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("هیچ کاربری با این ایمیل یافت نشد");
        }

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          throw new Error("نام کاربری یا رمز عبور اشتباه است");
        }

        return { email };
      },
    }),
  ],
});

export { handler as GET, handler as POST };
