import { MdPublish, MdUnpublished } from "react-icons/md";
import toast from "react-hot-toast";

import styles from "./Button.module.css";

function PublishUnPublishButton({
  profileId,
  type,
  setProfilesState,
  getAllAfterChange = false,
}) {
  const publishUnPublishHandler = async () => {
    const toastId = toast.loading("در حال ارسال اطلاعات ...");

    try {
      const res = await fetch(`/api/profile/${profileId}`, {
        method: "PATCH",
        body: JSON.stringify({
          type,
        }),
        headers: { "Content-Type": "applicaton/json" },
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        if (getAllAfterChange) {
          const allProfiles = await fetch("/api/profile");
          const allProfilesJson = await allProfiles.json();
          setProfilesState(allProfilesJson.data);
        } else {
          setProfilesState(json.data);
        }
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
      onClick={publishUnPublishHandler}
      style={{
        borderColor: "var(--color-blue)",
        color: "var(--color-blue)",
      }}
    >
      {type === "publish" && (
        <>
          انتشار
          <MdPublish />
        </>
      )}
      {type === "unPublish" && (
        <>
          عدم انتشار
          <MdUnpublished />
        </>
      )}
    </button>
  );
}

export default PublishUnPublishButton;
