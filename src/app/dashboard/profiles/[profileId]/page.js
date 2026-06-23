import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";
import { modelProfilelKeys } from "@/constants/profiles";

import EditProfilePage from "@/components/templates/EditProfilePage";

export default async function EditProfile({ params: { profileId } }) {
  const isConnected = await connectDB();
  if (!isConnected) {
    return notFound();
  }

  try {
    const data = await getServerSession();
    if (!data?.user?.email) {
      return notFound();
    }

    const user = await User.findOne({ email: data.user.email }).lean();
    if (!user) {
      return redirect("/account/sign-in");
    }

    const profile = await Profile.findById(profileId).lean();
    if (!profile) {
      return notFound();
    }

    if (user._id.toString() !== profile.userId.toString()) {
      return notFound();
    }

    const initialState = {};
    for (const i of modelProfilelKeys) {
      initialState[i] = profile[i];
    }

    return (
      <EditProfilePage
        initialState={JSON.parse(JSON.stringify(initialState))}
        profileId={profile._id.toString()}
      />
    );
  } catch (err) {
    return notFound();
  }
}
