import { checkIsSignedIn } from "@/utils/api";
import { redirect } from "next/navigation";

import SignInPage from "@/components/templates/SignInPage";

export const metadata = {
  title: "املاک | وارد حساب کاربری خود شوید",
};

export default async function SignIn() {
  const usersEmail = await checkIsSignedIn();

  if (usersEmail) redirect("/");

  return <SignInPage />;
}
