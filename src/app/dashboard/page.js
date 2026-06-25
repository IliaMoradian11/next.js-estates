import { redirect } from "next/navigation";

import { checkIsSignedIn, getUserDatas } from "@/utils/api";
import DashboardPage from "@/components/templates/DashboardPage";

export default async function Dashboard() {
  const usersEmail = await checkIsSignedIn();

  if (!usersEmail) redirect("/");

  const user = await getUserDatas(usersEmail);
  if (!user) redirect("/");

  return <DashboardPage createdAt={user.createdAt} />;
}
