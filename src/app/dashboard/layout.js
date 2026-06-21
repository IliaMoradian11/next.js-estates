import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { notFound, redirect } from "next/navigation";

import DashboardLayoutComponent from "@/components/layout/DashboardLayout";

export default async function DashboardLayout({ children }) {
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
    return <DashboardLayoutComponent children={children} email={user.email} />;
  } catch (err) {
    notFound();
  }
}
