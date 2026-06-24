import { notFound } from "next/navigation";

import connectDB from "@/utils/connectDB";
import HomePage from "@/components/templates/HomePage";
import Profile from "@/models/Profile";

export default async function Home() {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return notFound();
    }

    const profiles = await Profile.find({ isPublished: true }).lean();
    const displayedProfiles = profiles.slice(0, 8);

    return <HomePage profiles={displayedProfiles} />;
  } catch (err) {
    return notFound();
  }
}
