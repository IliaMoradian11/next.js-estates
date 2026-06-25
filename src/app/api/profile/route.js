import {
  createdSuccessfully,
  internalServerError,
  notSignedIn,
  successfullyGet,
  unProcessableEntity,
} from "@/constants/responses";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";

export async function POST(req) {
  const data = await req.json();
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
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
      return unProcessableEntity("لطفا فیلد های الزامی (ستاره دار) را پر کنید");
    }

    if (data.price < 1000000) {
      return unProcessableEntity("قیمت باید حتما بیشتر از 1 میلیون تومان باشد");
    }

    const usersEmail = await checkIsSignedIn();
    if (!usersEmail) {
      return notSignedIn();
    }

    const user = await getUserDatas(usersEmail);
    if (!user) {
      return notSignedIn();
    }

    const isPublished =
      user.role === "ADMIN" || user.role === "SUPER_USER" ? true : false;

    await Profile.create({ ...data, userId: user._id, isPublished });

    return createdSuccessfully("آگهی با موفقیت ایجاد شد");
  } catch (err) {
    return internalServerError();
  }
}

export async function GET() {
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  try {
    const profiles = await Profile.find();

    return successfullyGet(profiles);
  } catch (err) {
    return internalServerError();
  }
}
