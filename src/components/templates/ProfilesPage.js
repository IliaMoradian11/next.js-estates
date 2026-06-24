import Card from "../modules/Card";
import ProfilesSidebar from "../modules/ProfilesSidebar";

import styles from "./ProfilesPage.module.css";

function ProfilesPage({ profiles }) {
  return (
    <div className={styles.container}>
      <ProfilesSidebar />
      <main>
        {profiles.length ? (
          profiles.map((profile) => (
            <div className={styles.card}>
              <Card profile={profile} />
            </div>
          ))
        ) : (
          <p className={styles.noProduct}>هیچ آگهی یافت نشد</p>
        )}
      </main>
    </div>
  );
}

export default ProfilesPage;
