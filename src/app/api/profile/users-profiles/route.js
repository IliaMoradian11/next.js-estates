import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export async function GET(req) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }

  try {
    const data = await getServerSession();
    if (!data?.user?.email) {
      return NextResponse.json(
        { ok: false, message: "ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: data.user.email });
    console.log(user);
    return NextResponse.json({ ok: false, message: "all right" });
  } catch (err) {}
}
