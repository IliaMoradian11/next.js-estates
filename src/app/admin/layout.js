import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import { redirect } from "next/navigation";

import DashboardLayoutComponent from "@/components/layout/DashboardLayout";

export const metadata = {
  title: "املاک | پنل ادمین",
};

export default async function DashboardLayout({ children }) {
  const usersEmail = await checkIsSignedIn();

  if (!usersEmail) redirect("/");

  const user = await getUserDatas(usersEmail);
  if (!user) return redirect("/");
  if (user.role !== "ADMIN") redirect("/");

  return (
    <DashboardLayoutComponent
      children={children}
      email={user.email}
      role={user.role}
    />
  );
}
