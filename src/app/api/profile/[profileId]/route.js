import {
  changedSuccessfully,
  deletedSuccessfully,
  internalServerError,
  notAllowed_403,
  notFound,
  notSignedIn,
  unProcessableEntity,
} from "@/constants/responses";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { modelProfilelKeys } from "@/constants/profiles";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import User from "@/models/User";

export async function PUT(req, { params }) {
  const data = await req.json();
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  try {
    const usersEmail = await checkIsSignedIn();
    if (!usersEmail) {
      return notSignedIn();
    }

    const user = await getUserDatas(usersEmail);
    if (!user) {
      return notSignedIn();
    }

    const profile = await Profile.findById(params.profileId);
    if (!profile) {
      return notFound("هیچ آگهی با این آیدی ثبت نشده است");
    }

    if (user._id.toString() !== profile.userId.toString()) {
      if (!(user.role === "ADMIN" || user.role === "SUPER_USER")) {
        return notAllowed_403("شما قادر به تغییر این آگهی نیستید");
      }

      const changingProfileUser = await User.findById(profile.userId);
      if (changingProfileUser.role === "SUPER_USER") {
        return notAllowed_403(
          "آگهی هایی که super user ثبت کرده قابل تغییر نیست",
        );
      } else if (changingProfileUser.role === "ADMIN") {
        if (user.role !== "SUPER_USER") {
          return notAllowed_403(
            "برای تغییر آگهی هایی که ادمین ثبت کرده باید super user باشید",
          );
        }
      }
    }

    for (const i of modelProfilelKeys) {
      profile[i] = data[i];
    }

    profile.isPublished = false;

    await profile.save();

    return changedSuccessfully(profile);
  } catch (err) {
    return internalServerError();
  }
}

export async function PATCH(req, { params }) {
  const { type } = await req.json();
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  try {
    const usersEmail = await checkIsSignedIn();
    if (!usersEmail) {
      return notSignedIn();
    }

    const user = await getUserDatas(usersEmail);
    if (!user) {
      return notSignedIn();
    }

    if (!(user.role === "ADMIN" || user.role === "SUPER_USER")) {
      return notAllowed_403("شما قادر به تغییر این آگهی نیستید");
    }

    const profile = await Profile.findById(params.profileId);
    if (!profile) {
      return notFound("هیچ آگهی با این آیدی ثبت نشده است");
    }

    if (user._id.toString() !== profile.userId.toString()) {
      const changingProfileUser = await User.findById(profile.userId);
      if (changingProfileUser.role === "SUPER_USER") {
        return notAllowed_403(
          "آگهی هایی که super user ثبت کرده قابل تغییر نیست",
        );
      } else if (changingProfileUser.role === "ADMIN") {
        if (user.role !== "SUPER_USER") {
          return notAllowed_403(
            "برای تغییر آگهی هایی که ادمین ثبت کرده باید super user باشید",
          );
        }
      }
    }

    if (type === "publish") {
      profile.isPublished = true;
    } else if (type === "unPublish") {
      profile.isPublished = false;
    } else {
      return unProcessableEntity();
    }

    await profile.save();

    let otherProfiles;

    if (type === "publish") {
      otherProfiles = await Profile.find({ isPublished: false });
    } else {
      otherProfiles = await Profile.find({ isPublished: true });
    }

    return changedSuccessfully(otherProfiles);
  } catch (err) {
    return internalServerError();
  }
}

export async function DELETE(req, { params }) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return internalServerError();
  }

  try {
    const usersEmail = await checkIsSignedIn();
    if (!usersEmail) {
      return notSignedIn();
    }

    const user = await getUserDatas(usersEmail);
    if (!user) {
      return notSignedIn();
    }

    const profile = await Profile.findById(params.profileId);

    if (user._id.toString() !== profile.userId.toString()) {
      if (!(user.role === "ADMIN" || user.role === "SUPER_USER")) {
        return notAllowed_403("شما قادر به تغییر این آگهی نیستید");
      }

      const changingProfileUser = await User.findById(profile.userId);
      if (changingProfileUser.role === "SUPER_USER") {
        return notAllowed_403(
          "آگهی هایی که super user ثبت کرده قابل تغییر نیست",
        );
      } else if (changingProfileUser.role === "ADMIN") {
        if (user.role !== "SUPER_USER") {
          return notAllowed_403(
            "برای تغییر آگهی هایی که ادمین ثبت کرده باید super user باشید",
          );
        }
      }
    }

    await Profile.findByIdAndDelete(params.profileId);

    return deletedSuccessfully();
  } catch (err) {
    console.log(err);
    return internalServerError();
  }
}
