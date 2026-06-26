import { redirect } from "next/navigation";

import connectDB from "@/utils/connectDB";
import Profile from "@/models/Profile";

import AdminPage from "@/components/templates/AdminPage";

export default async function Admin() {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  try {
    const profiles = await Profile.find({ isPublished: true }).lean();
    return (
      <AdminPage
        profiles={JSON.parse(JSON.stringify(profiles))}
        type="unPublish"
      />
    );
  } catch (err) {
    redirect("/");
  }
}
