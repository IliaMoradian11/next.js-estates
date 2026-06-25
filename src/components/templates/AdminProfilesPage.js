"use client";

import { useState } from "react";

import Card from "../modules/Card";
import DeleteButton from "../modules/DeleteButton";
import EditButton from "../modules/EditButton";
import PublishUnPublishButton from "../modules/PublishUnPublishButton";

import styles from "./UsersProfilesPage.module.css";

function AdminProfilesPage({ profiles }) {
  const [profilesState, setProfilesState] = useState(profiles);
  return (
    <div className={styles.container}>
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
        <div className={styles.noProfile}>هیچ آگهی ثبت نکردید</div>
      )}
    </div>
  );
}

export default AdminProfilesPage;
