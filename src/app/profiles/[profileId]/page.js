import { notFound } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";
import ProfileDetailsPage from "../../../components/templates/ProfileDetailsPage";

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
