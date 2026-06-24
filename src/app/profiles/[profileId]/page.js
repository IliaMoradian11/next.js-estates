import { notFound } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import ProfileDetailsPage from "../../../components/templates/ProfileDetailsPage";

export const metadata = {
  title: "املاک | مشاهده آگهی",
};

export default async function ProfileDetails(req) {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return notFound();
    }

    const profile = await Profile.findById(req.params.profileId).lean();
    if (!profile) {
      return notFound();
    }

    return <ProfileDetailsPage profile={profile} />;
  } catch (err) {
    return notFound();
  }
}

export async function generateMetadata({ params }) {
  await connectDB();
  const profile = await Profile.findById(params.profileId).lean();
  return {
    title: `املاک | ${profile.titleMetadata || "مشاهده آگهی"}`,
    description: profile.descriptionMetadata,
    authors: { name: profile.authorMetadata },
    keywords: profile.keyWordsMetadata.map(i => i.text)
  };
}
