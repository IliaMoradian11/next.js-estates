"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import AdminProfilesPage from "./AdminProfilesPage";

import styles from "./AdminUserDetailsPage.module.css";

const roles = ["USER", "ADMIN", "SUPER_USER"];

function AdminUserDetailsPage({ user, isThisUser }) {
  const router = useRouter();
  const [userState, setUserState] = useState(user);
  const { email, role, createdAt, profiles } = userState;

  const changeHandler = async (type) => {
    const toastId = toast.loading("در حال ارسال اطلاعات ...");

    try {
      const res = await fetch(`/api/users/${userState._id}`, {
        method: "PATCH",
        body: JSON.stringify({ type }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.ok) {
        setUserState(json.data);
        toast.success(json.message, { id: toastId });
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      toast.error("مشکلی پیش آمد", { id: toastId });
    }
  };

  const deleteHandler = async () => {
    const toastId = toast.loading("در حال ارسال اطلاعات ...");

    try {
      const res = await fetch(`/api/users/${userState._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        router.replace("/admin/users");
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      console.log(err)
      toast.error("مشکلی پیش آمد", { id: toastId });
    }
  };

  return (
    <div className={styles.container}>
      <h3>صفحه جزئیات کاربر {email}</h3>
      <div>
        <main>
          <AdminProfilesPage
            profiles={profiles}
            noProfileText="کاربر هیچ آگهی ثبت نکرده"
            columnsCount={2}
          />
        </main>
        <aside>
          <p>
            <span>نقش:</span>
            <br />
            {role.toLowerCase().replace("_", " ")}
          </p>
          <p>
            <span>تاریخ عضویت:</span>
            <br />
            {new Date(createdAt).toLocaleString("fa-IR")}
          </p>
          {!isThisUser && role !== "SUPER_USER" && (
            <>
              <button
                style={{ background: "var(--color-green)" }}
                onClick={() => changeHandler("increase")}
              >
                ارتقا به{" "}
                {roles[roles.indexOf(role) + 1].toLowerCase().replace("_", " ")}
              </button>
              {role !== "USER" && (
                <button
                  style={{ background: "var(--color-red)" }}
                  onClick={() => changeHandler("decrease")}
                >
                  کاهش به{" "}
                  {roles[roles.indexOf(role) - 1]
                    .toLowerCase()
                    .replace("_", " ")}
                </button>
              )}
              <button
                style={{ background: "var(--color-red)" }}
                onClick={deleteHandler}
              >
                حذف کاربر
              </button>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default AdminUserDetailsPage;
