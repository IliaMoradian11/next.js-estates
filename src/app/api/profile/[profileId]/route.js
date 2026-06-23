import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";

export async function GET(req, { params }) {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return NextResponse.json(
        { ok: false, error: "مشکلی در سرور پیش آمد" },
        { status: 500 },
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

    return NextResponse.json({ ok: true, data: profile });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }
}
