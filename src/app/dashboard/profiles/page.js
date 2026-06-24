import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import UsersProfilesPage from "@/components/templates/UsersProfilesPage";

export const metadata = {
  title: "املاک | آگهی های من",
};

export default async function UserProfiles() {
  const isConnected = await connectDB();
  if (!isConnected) {
    return notFound();
  }

  try {
    const data = await getServerSession();
    if (!data?.user?.email) {
      return notFound();
    }

    const [user] = await User.aggregate([
      { $match: { email: data.user.email } },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "profiles",
        },
      },
    ]);
    if (!user) {
      return redirect("/account/sign-in");
    }

    return <UsersProfilesPage profiles={user.profiles} />;
  } catch (err) {
    return redirect("/account/sign-in");
  }
}
