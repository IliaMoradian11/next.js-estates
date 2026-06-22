import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import Profile from "@/models/Profile";
import User from "@/models/User";

export async function POST(req) {
  const data = await req.json();
  const isConnected = await connectDB();
  if (!isConnected) {
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }

  try {
    if (
      !data.title ||
      !data.descriptions ||
      !data.location ||
      !data.phone ||
      !data.price ||
      !data.realState ||
      !data.category ||
      !data.constructionDate
    ) {
      return NextResponse.json({
        ok: false,
        error: "لطفا فیلد های الزامی (ستاره دار) را پر کنید",
      });
    }

    if (data.price < 1000000) {
      return NextResponse.json({
        ok: false,
        error: "قیمت باید حتما بیشتر از 1 میلیون تومان باشد",
      });
    }

    const userData = await getServerSession();
    if (!userData?.user?.email) {
      return NextResponse.json(
        { ok: false, error: "ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: userData.user.email });
    if (!user) {
      return NextResponse.json(
        { ok: false, error: "ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    await Profile.create({ ...data, userId: user._id });

    return NextResponse.json({ ok: true, message: "آگهی با موفقیت ایجاد شد" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "مشکلی در سرور پیش آمد" });
  }
}
