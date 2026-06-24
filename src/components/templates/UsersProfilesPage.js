"use client";

import Card from "../modules/Card";
import DeleteButton from "../modules/DeleteButton";

import styles from "./UsersProfilesPage.module.css";
import EditButton from "../modules/EditButton";

function UsersProfilesPage({ profiles }) {
  return (
    <div className={styles.container}>
      {profiles.length ? (
        profiles.map((profile) => (
          <div className={styles.card} key={profile._id}>
            <Card profile={profile} />
            <EditButton profileId={profile._id} />
            <DeleteButton profileId={profile._id} />
          </div>
        ))
      ) : (
        <div className={styles.noProfile}>هیچ آگهی ثبت نکردید</div>
      )}
    </div>
  );
}

export default UsersProfilesPage;
