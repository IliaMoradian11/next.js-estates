import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import User from "@/models/User";
import { modelProfilelKeys } from "@/constants/profiles";

export async function PUT(req, { params }) {
  const data = await req.json();

  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return NextResponse.json(
        { ok: false, error: "مشکلی در سرور پیش آمد" },
        { status: 500 },
      );
    }

    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, message: "ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { ok: false, message: "ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const profile = await Profile.findById(params.profileId);
    if (!profile) {
      return NextResponse.json(
        {
          ok: false,
          error: "هیچ آگهی با این آیدی ثبت نشده است",
        },
        { status: 404 },
      );
    }

    if (user._id.toString() !== profile.userId.toString()) {
      return NextResponse.json(
        {
          ok: false,
          error: "شما قادر به تغییر این آگهی نیستید",
        },
        { status: 403 },
      );
    }

    for (const i of modelProfilelKeys) {
      profile[i] = data[i];
    }

    profile.save();

    return NextResponse.json({
      ok: true,
      message: "با موفقیت تغییر کرد",
      data: profile,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }
}
