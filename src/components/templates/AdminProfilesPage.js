"use client";

import { useState } from "react";

import Card from "../modules/Card";
import DeleteButton from "../modules/DeleteButton";
import EditButton from "../modules/EditButton";
import PublishUnPublishButton from "../modules/PublishUnPublishButton";

import styles from "./UsersProfilesPage.module.css";

function AdminProfilesPage({
  profiles,
  noProfileText = "هیچ آگهی ثبت نکردید",
  columnsCount = 3,
}) {
  const [profilesState, setProfilesState] = useState(profiles);
  return (
    <div
      className={`${styles.container} ${columnsCount === 2 ? styles.columns2 : null}`}
    >
      {profilesState.length ? (
        profilesState.map((profile) => (
          <div className={styles.card} key={profile._id}>
            <Card profile={profile} />
            {!profile.isPublished ? (
              <PublishUnPublishButton
                profileId={profile._id}
                type="publish"
                getAllAfterChange={true}
                setProfilesState={setProfilesState}
              />
            ) : (
              <PublishUnPublishButton
                profileId={profile._id}
                type="unPublish"
                getAllAfterChange={true}
                setProfilesState={setProfilesState}
              />
            )}
            <EditButton profileId={profile._id} />
            <DeleteButton profileId={profile._id} />
          </div>
        ))
      ) : (
        <div className={styles.noProfile}>{noProfileText}</div>
      )}
    </div>
  );
}

export default AdminProfilesPage;
