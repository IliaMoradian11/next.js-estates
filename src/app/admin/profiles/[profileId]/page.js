import { notFound } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { modelProfilelKeys } from "@/constants/profiles";
import buildMetadata from "@/utils/buildMetadata";

import EditProfilePage from "@/components/templates/EditProfilePage";

export default async function AdminEditProfile({ params: { profileId } }) {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  try {
    const profile = await Profile.findById(profileId).lean();
    if (!profile) notFound();

    const initialState = {};
    for (const i of modelProfilelKeys) {
      initialState[i] = profile[i];
    }

    return (
      <EditProfilePage initialState={initialState} profileId={profile._id} />
    );
  } catch (err) {
    notFound();
  }
}

export async function generateMetadata({ params }) {
  await connectDB();
  const profile = await Profile.findById(params.profileId).lean();
  return buildMetadata(profile, "مشاهده آگهی");
}
