import { redirect } from "next/navigation";

import AdminUserDetailsPage from "@/components/templates/AdminUserDetailsPage";
import User from "@/models/User";
import { checkIsSignedIn, getUserDatas } from "@/utils/api";

export default async function UserDetails({ params }) {
  const usersEmail = await getUserDatas({ _id: params.userId });
  if (!usersEmail) redirect("/admin/users");

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

  const thisUsersEmail = await checkIsSignedIn()
  const thisUser = await getUserDatas(thisUsersEmail)


  return (
    <AdminUserDetailsPage
      user={JSON.parse(JSON.stringify(user))}
      isThisUser={thisUser.email === user.email}
    />
  );
}

export async function generateMetadata({ params }) {
  const user = await getUserDatas({ _id: params.userId });
  return {
    title: `املاک | صفحه جزئیات کاربر ${user.email}`,
  };
}
