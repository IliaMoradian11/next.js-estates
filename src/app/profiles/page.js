import { notFound } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import ProfilesPage from "@/components/templates/ProfilesPage";

export const metadata = {
  title: "املاک | آگهی ها",
};

export default async function Profiles(req) {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return notFound();
    }

    const category = req.searchParams?.category;
    let searchInProfile = { isPublished: true };

    if (category) {
      searchInProfile.category = category;
    }

    const profiles = await Profile.find(searchInProfile).lean();

    return <ProfilesPage profiles={profiles} />;
  } catch (err) {
    return notFound();
  }
}
