import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

import User from "@/models/User";
import DashboardPage from "@/components/templates/DashboardPage";
import connectDB from "@/utils/connectDB";

export default async function Dashboard() {
  const data = await getServerSession();

  if (data?.status === "unauthenticated" || !data) {
    redirect("/account/sign-in");
  }

  if (data?.status === "loading") {
    return null;
  }

  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      notFound();
    }

    const user = await User.findOne({ email: data.user.email });

    return (
      <DashboardPage user={{ createdAt: user.createdAt, email: user.email }} />
    );
  } catch (err) {
    notFound();
  }
}
