import { notFound, redirect } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import ProfileDetailsPage from "../../../components/templates/ProfileDetailsPage";
import buildMetadata from "@/utils/buildMetadata";

export default async function ProfileDetails(req) {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  const profile = await Profile.findById(req.params.profileId).lean();
  if (!profile) notFound();
  if (profile.isPublished === false) notFound();

  const usersEmail = await checkIsSignedIn();
  let isAdmin = false;
  if (usersEmail) {
    const user = await getUserDatas(usersEmail);
    isAdmin =
      user.role === "ADMIN" || user.role === "SUPER_USER" ? true : false;
  }

  return (
    <ProfileDetailsPage
      profile={JSON.parse(JSON.stringify(profile))}
      isAdmin={isAdmin}
    />
  );
}

export async function generateMetadata({ params }) {
  await connectDB();
  const profile = await Profile.findById(params.profileId).lean();
  return buildMetadata(profile, "مشاهده آگهی");
}
