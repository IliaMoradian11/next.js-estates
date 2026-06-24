"use client";

import { useState } from "react";

import Card from "../modules/Card";
import DeleteButton from "../modules/DeleteButton";
import EditButton from "../modules/EditButton";
import PublishButton from "../modules/PublishButton";

import styles from "./AdminPage.module.css";

function AdminPage({ profiles }) {
  const [profilesState, setProfilesState] = useState(profiles);

  return (
    <div className={styles.container}>
      {profilesState.length ? (
        profilesState.map((profile) => (
          <div className={styles.card} key={profile._id}>
            <Card profile={profile} />
            <PublishButton
              profileId={profile._id}
              setProfilesState={setProfilesState}
            />
            <EditButton path="admin" profileId={profile._id} />
            <DeleteButton profileId={profile._id} />
          </div>
        ))
      ) : (
        <div className={styles.noProfile}>آگهی جدیدی ثبت نشده است</div>
      )}
    </div>
  );
}

export default AdminPage;
