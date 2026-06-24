import Link from "next/link";
import { FaEdit } from "react-icons/fa";

import styles from "./Button.module.css";

function EditButton({ path = "dashboard", profileId }) {
  return (
    <Link
      href={`/${path}/profiles/${profileId}`}
      className={styles.button}
      style={{
        borderColor: "var(--color-green)",
        color: "var(--color-green)",
      }}
    >
      ویرایش
      <FaEdit />
    </Link>
  );
}

export default EditButton;
