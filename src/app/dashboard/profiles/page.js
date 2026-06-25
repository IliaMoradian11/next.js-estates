import { notFound, redirect } from "next/navigation";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import UsersProfilesPage from "@/components/templates/UsersProfilesPage";
import { checkIsSignedIn } from "@/utils/api";

export const metadata = {
  title: "املاک | آگهی های من",
};

export default async function UserProfiles() {
  const isConnected = await connectDB();
  if (!isConnected) redirect("/");

  try {
    const usersEmail = await checkIsSignedIn();

    const [user] = await User.aggregate([
      { $match: usersEmail },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "profiles",
        },
      },
    ]);
    if (!user) redirect("/");

    return <UsersProfilesPage profiles={user.profiles} />;
  } catch (err) {
    redirect("/");
  }
}
