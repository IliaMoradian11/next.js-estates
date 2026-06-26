import connectDB from "@/utils/connectDB";
import {
  changedSuccessfully,
  deletedSuccessfully,
  internalServerError,
  notAllowed_403,
  notSignedIn,
  unProcessableEntity,
} from "@/constants/responses";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function PATCH(req, { params }) {
  const { type } = await req.json();
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  const userEmail = await checkIsSignedIn();
  if (!userEmail) {
    return notSignedIn();
  }

  const user = await getUserDatas(userEmail);
  if (!(user.role === "ADMIN" || user.role === "SUPER_USER")) {
    return notAllowed_403();
  }

  try {
    const changingUser = await getUserDatas({ _id: params.userId });
    if (changingUser._id.toString() === user._id.toString()) {
      return notAllowed_403("نمی توانید درجه خود را تغییر دهید");
    }
    if (changingUser.role === "SUPER_USER") {
      return notAllowed_403("کاربر super user را نمی توان تغییر داد");
    }

    if (type === "increase") {
      if (changingUser.role === "USER") {
        changingUser.role = "ADMIN";
      } else if (changingUser.role === "ADMIN") {
        if (user.role !== "SUPER_USER") {
          return notAllowed_403();
        }
        changingUser.role = "SUPER_USER";
      }
    } else if (type === "decrease") {
      if (changingUser.role === "USER") {
        return notAllowed_403("نمی توان درجه user را کاهش داد");
      } else if (changingUser.role === "ADMIN") {
        if (user.role !== "SUPER_USER") {
          return notAllowed_403();
        }
        changingUser.role = "USER";
      }
    } else {
      return unProcessableEntity();
    }

    await changingUser.save();

    return changedSuccessfully(changingUser);
  } catch (err) {
    return internalServerError();
  }
}

export async function DELETE(req, { params }) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  const userEmail = await checkIsSignedIn();
  if (!userEmail) {
    return notSignedIn();
  }

  const user = await getUserDatas(userEmail);
  if (!(user.role === "ADMIN" || user.role === "SUPER_USER")) {
    return notAllowed_403();
  }

  try {
    const changingUser = await getUserDatas({ _id: params.userId });
    if (changingUser._id.toString() === user._id.toString()) {
      return notAllowed_403("نمی توانید خودتان را حذف کنید");
    }
    if (changingUser.role === "SUPER_USER") {
      return notAllowed_403("کاربر super user را نمی توان تغییر داد");
    }

    if (changingUser.role === "ADMIN" && user.role !== "SUPER_USER") {
      return notAllowed_403();
    }

    await Profile.deleteMany({ userId: changingUser._id });

    await User.findByIdAndDelete(changingUser._id);

    return deletedSuccessfully("کاربر و آگهی هایش با موفقیت حذف شد");
  } catch (err) {
    return internalServerError();
  }
}
