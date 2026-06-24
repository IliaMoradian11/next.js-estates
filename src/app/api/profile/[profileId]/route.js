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
      if (user.role !== "ADMIN") {
        return NextResponse.json(
          {
            ok: false,
            error: "شما قادر به تغییر این آگهی نیستید",
          },
          { status: 403 },
        );
      }
    }

    for (const i of modelProfilelKeys) {
      profile[i] = data[i];
    }

    await profile.save();

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

export async function PATCH(req, { params }) {
  const { type } = await req.json();

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
    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { ok: false, message: "فقط ادمین اجازه تغییر آگهی را دارد" },
        { status: 403 },
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

    if (type === "publish") {
      profile.isPublished = true;
    } else if (type === "unPublish") {
      profile.isPublished = false;
    } else {
      return NextResponse.json(
      { ok: false, error: "تغییر نکرد" },
      { status: 422 },
    );;
    }

    await profile.save();

    const unPublishedProfiles = await Profile.find({
      isPublished: false,
    }).lean();

    return NextResponse.json({
      ok: true,
      message: "با موفقیت تغییر کرد",
      data: unPublishedProfiles,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
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

    if (user._id.toString() !== profile.userId.toString()) {
      if (user.role !== "ADMIN") {
        return NextResponse.json(
          {
            ok: false,
            message: "فقط ادمین یا سازنده آگهی اجازه تغییر آگهی را دارد",
          },
          { status: 403 },
        );
      }
    }

    await Profile.findByIdAndDelete(params.profileId);

    return NextResponse.json({
      ok: true,
      message: "حذف شد",
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { ok: false, error: "مشکلی در سرور پیش آمد" },
      { status: 500 },
    );
  }
}
