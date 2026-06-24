import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import User from "@/models/User";
import DashboardPage from "@/components/templates/DashboardPage";
import connectDB from "@/utils/connectDB";

export default async function Dashboard() {
  const data = await getServerSession();

  if (!data?.user?.email) {
    return redirect("/account/sign-in");
  }

  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      return notFound();
    }

    const user = await User.findOne({ email: data.user.email });
    if (!user) {
      return redirect("/account/sign-in");
    }

    return <DashboardPage createdAt={user.createdAt} />;
  } catch (err) {
    return redirect("/account/sign-in");
  }
}
