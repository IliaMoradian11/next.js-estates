import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return NextResponse.json({ ok: false, error: "مشکلی در سرور پیش آمد" });
  }

  try {
    const { email, password } = await req.json();
    if (email?.length < 4 || password?.length < 8) {
      return NextResponse.json({
        ok: false,
        error: "ایمیل باید بیش از چهار و رمز عبور باید بیش از هشت حرف باشد",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        ok: false,
        error: "این ایمیل قبلا ثبت نام شده است",
      });
    }

    const hashedPassword = await hashPassword(password);
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ ok: true, message: "کاربر با موفقیت ایجاد شد" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "مشکلی در سرور پیش آمد" });
  }
}
