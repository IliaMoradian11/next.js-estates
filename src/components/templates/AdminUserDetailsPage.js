import AdminProfilesPage from "./AdminProfilesPage";

import styles from "./AdminUserDetailsPage.module.css";

const roles = ["USER", "ADMIN", "SUPER_USER"];

function AdminUserDetailsPage({ user, isThisUser }) {
  const { email, role, createdAt, profiles } = user;

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
              <button style={{ background: "var(--color-green)" }}>
                ارتقا به{" "}
                {roles[roles.indexOf(role) + 1].toLowerCase().replace("_", " ")}
              </button>
              {role !== "USER" && (
                <button style={{ background: "var(--color-red)" }}>
                  کاهش به{" "}
                  {roles[roles.indexOf(role) - 1]
                    .toLowerCase()
                    .replace("_", " ")}
                </button>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}

export default AdminUserDetailsPage;
