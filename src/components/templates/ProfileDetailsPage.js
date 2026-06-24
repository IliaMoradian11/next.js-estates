import { HiOutlineLocationMarker } from "react-icons/hi";
import ProfilesDetailsSidebar from "../modules/ProfilesDetailsSidebar";

import { e2p } from "@/utils/replaceNumber";

import styles from "./ProfileDetailsPage.module.css";

function ProfileDetailsPage({ profile }) {
  const { title, location, descriptions, amenities, rules } = profile;
  console.log(profile)
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
      </main>
      <ProfilesDetailsSidebar profile={profile} />
    </div>
  );
}

export default ProfileDetailsPage;
