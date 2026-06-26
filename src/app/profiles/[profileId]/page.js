import { notFound, redirect } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import ProfileDetailsPage from "../../../components/templates/ProfileDetailsPage";

export default async function ProfileDetails(req) {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  const profile = await Profile.findById(req.params.profileId).lean();
  if (!profile) notFound();

  return <ProfileDetailsPage profile={JSON.parse(JSON.stringify(profile))} />;
}

export async function generateMetadata({ params }) {
  await connectDB();
  const profile = await Profile.findById(params.profileId).lean();
  return {
    title: `املاک | ${profile.titleMetadata || "مشاهده آگهی"}`,
    description: profile.descriptionMetadata,
    authors: { name: profile.authorMetadata },
    keywords: profile.keyWordsMetadata.map((i) => i.text),
  };
}
