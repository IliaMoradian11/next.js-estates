import User from "@/models/User";

import AdminUsersPage from "@/components/templates/AdminUsersPage";

export const metadata = {
  title: "املاک | مشاهده لیست کاربران",
};

export default async function UsersPage() {
  try {
    const users = await User.find();

    return <AdminUsersPage users={users} />;
  } catch (err) {}
}
