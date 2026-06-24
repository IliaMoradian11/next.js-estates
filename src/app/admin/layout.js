import { getServerSession } from "next-auth";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import { notFound, redirect } from "next/navigation";

import DashboardLayoutComponent from "@/components/layout/DashboardLayout";

export const metadata = {
  title: "املاک | پنل ادمین",
};

export default async function DashboardLayout({ children }) {
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
    if (user.role !== "ADMIN") {
      return redirect("/dashboard");
    }

    return (
      <DashboardLayoutComponent
        children={children}
        email={user.email}
        role={user.role}
      />
    );
  } catch (err) {
    return redirect("/account/sign-in");
  }
}
