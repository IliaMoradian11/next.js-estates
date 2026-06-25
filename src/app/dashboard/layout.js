import { redirect } from "next/navigation";

import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import DashboardLayoutComponent from "@/components/layout/DashboardLayout";

export const metadata = {
  title: "املاک | پنل کاربری",
};

export default async function DashboardLayout({ children }) {
  const usersEmail = await checkIsSignedIn();

  if (!usersEmail) redirect("/");

  const user = await getUserDatas(usersEmail);
  if (!user) redirect("/");

  return (
    <DashboardLayoutComponent
      children={children}
      email={user.email}
      role={user.role}
    />
  );
}
