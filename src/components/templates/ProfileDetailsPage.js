"use client";

import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";

import ProfilesDetailsSidebar from "../modules/ProfilesDetailsSidebar";
import EditButton from "../modules/EditButton";
import DeleteButton from "../modules/DeleteButton";
import PublishUnPublishButton from "../modules/PublishUnPublishButton";
import { e2p } from "@/utils/replaceNumber";

import styles from "./ProfileDetailsPage.module.css";

function ProfileDetailsPage({ profile, isAdmin }) {
  const { title, location, descriptions, amenities, rules, userId } = profile;

  return (
    <div className={styles.container}>
      <main>
        <h3>{e2p(title)}</h3>
        <div className={styles.location}>
          <HiOutlineLocationMarker />
          {e2p(location)}
        </div>
        <div>
          <h5>توضیحات</h5>
          <p>{e2p(descriptions)}</p>
        </div>
        <div>
          <h5>امکانات</h5>
          <ul>
            {amenities.length ? (
              amenities.map((i) => <li>{e2p(i.text)}</li>)
            ) : (
              <li>-</li>
            )}
          </ul>
        </div>
        <div>
          <h5>قوانین</h5>
          <ul>
            {rules.length ? (
              rules.map((i) => <li>{e2p(i.text)}</li>)
            ) : (
              <li>-</li>
            )}
          </ul>
        </div>
        {isAdmin && (
          <div>
            <h5>اختیارات ادمین</h5>
            <PublishUnPublishButton
              profileId={profile._id}
              getProfilesAfterChange={false}
              type="unPublish"
            />
            <EditButton profileId={profile._id} path="admin" />
            <DeleteButton profileId={profile._id} />
            <Link
              href={`/admin/users/${userId}`}
              style={{
                width: "100%",
                marginTop: "15px",
                textAlign: "center",
                padding: "5px",
                border: "2px solid black",
                display: "inline-block",
                fontWeight: "500",
                borderRadius: "5px",
              }}
            >
              مشاهده سازنده آگهی
            </Link>
          </div>
        )}
      </main>
      <ProfilesDetailsSidebar profile={profile} />
    </div>
  );
}

export default ProfileDetailsPage;
