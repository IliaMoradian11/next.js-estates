import { MdPublish } from "react-icons/md";
import toast from "react-hot-toast";

import styles from "./Button.module.css";

function PublishButton({ profileId, setProfilesState }) {
  const publishHandler = async () => {
    const toastId = toast.loading("در حال ارسال اطلاعات ...");

    try {
      const res = await fetch(`/api/profile/${profileId}`, {
        method: "PATCH",
        body: JSON.stringify({
          type: "publish",
        }),
        headers: { "Content-Type": "applicaton/json" },
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        setProfilesState(json.data);
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      toast.error("مشکلی رخ داد", { id: toastId });
    }
  };

  return (
    <button
      className={styles.button}
      onClick={publishHandler}
      style={{
        borderColor: "var(--color-blue)",
        color: "var(--color-blue)",
      }}
    >
      انتشار
      <MdPublish />
    </button>
  );
}

export default PublishButton;
