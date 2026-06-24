"use client";

import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BiCalendarCheck, BiShareAlt } from "react-icons/bi";
import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import toast from "react-hot-toast";

import { icons } from "@/constants/icons";
import { categories } from "@/constants/profiles";
import { e2p, sp } from "@/utils/replaceNumber";

import styles from "./ProfilesDetailsSidebar.module.css";

function ProfilesDetailsSidebar({
  profile: { realState, phone, category, price, constructionDate },
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <aside className={styles.aside}>
      <div>
        <SiHomebridge className={styles.homeSvg} />
        <p className={styles.realState}>املاک {e2p(realState)}</p>
        <div className={styles.phone}>
          <AiOutlinePhone />
          {e2p(phone)}
        </div>
      </div>
      <CopyToClipboard text={url} onCopy={() => toast.success("کپی شد!")}>
        <button>
          <BiShareAlt />
          اشتراک گذاری
        </button>
      </CopyToClipboard>
      <div className={styles.bottom}>
        <div>
          {icons[category]}
          {categories[category]}
        </div>
        <div>{sp(price)} تومان</div>
        <div>
          <BiCalendarCheck />
          {new Date(constructionDate).toLocaleDateString("fa-IR")}
        </div>
      </div>
    </aside>
  );
}

export default ProfilesDetailsSidebar;
