import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi";
import { RiAdminFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";

import styles from "./AdminUsersPage.module.css";

function AdminUsersPage({ users }) {
  return (
    <div className={styles.container}>
      <h2>مشاهده لیست کاربران</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ایمیل</th>
            <th>نقش</th>
            <th>تاریخ عضویت</th>
            <th>جزئیات</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>
                {user.role === "USER" && <FaRegUserCircle />}
                {user.role === "ADMIN" && (
                  <RiAdminFill color="var(--color-green)" />
                )}
                {user.role === "SUPER_USER" && (
                  <MdAdminPanelSettings color="var(--color-red)" />
                )}
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString("fa-IR")}</td>
              <td>
                <Link href={`/admin/users/${user._id}`}>
                  <HiInformationCircle />
                  <span>مشاهده</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;
