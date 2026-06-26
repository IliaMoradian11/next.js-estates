import { notFound, redirect } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { modelProfilelKeys } from "@/constants/profiles";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import buildMetadata from "@/utils/buildMetadata";

import EditProfilePage from "@/components/templates/EditProfilePage";

export default async function EditProfile({ params: { profileId } }) {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  try {
    const usersEmail = await checkIsSignedIn();

    if (!usersEmail) redirect("/");

    const user = await getUserDatas(usersEmail);
    if (!user) redirect("/");

    const profile = await Profile.findById(profileId).lean();
    if (!profile) notFound();

    if (user._id.toString() !== profile.userId.toString()) notFound();

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

export async function generateMetadata({ params }) {
  await connectDB();
  const profile = await Profile.findById(params.profileId).lean();
  return buildMetadata(profile, "مشاهده آگهی")
}
