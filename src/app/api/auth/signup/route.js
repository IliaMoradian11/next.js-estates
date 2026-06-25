import {
  createdSuccessfully,
  dbConnectionFaild,
  internalServerError,
  unProcessableEntity,
} from "@/constants/responses";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return dbConnectionFaild();
  }

  try {
    const { email, password } = await req.json();
    if (email?.length < 4 || password?.length < 8) {
      return unProcessableEntity(
        "ایمیل باید بیش از چهار و رمز عبور باید بیش از هشت حرف باشد",
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return unProcessableEntity("این ایمیل قبلا ثبت نام شده است");
    }

    const hashedPassword = await hashPassword(password);
    await User.create({ email, password: hashedPassword });

    return createdSuccessfully("کاربر با موفقیت ایجاد شد");
  } catch (err) {
    return internalServerError();
  }
}
