import { notFound, redirect } from "next/navigation";

import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import AdminProfilesPage from "@/components/templates/AdminProfilesPage";

export default async function UserProfiles() {
  const isConnected = await connectDB();
  if (!isConnected) {
    return notFound();
  }

  try {
    const profiles = await Profile.find().lean();

    return <AdminProfilesPage profiles={profiles} />;
  } catch (err) {
    return redirect("/account/sign-in");
  }
}
