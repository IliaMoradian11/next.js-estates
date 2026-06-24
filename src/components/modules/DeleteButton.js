import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

import styles from "./Button.module.css";

function DeleteButton({ profileId }) {
  const deleteHandler = async () => {
    const toastId = toast.loading("در حال ارسال اطلاعات ...");
    try {
      const res = await fetch(`/api/profile/${profileId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        window.location.reload();
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      toast.error("حذف نشد", { id: toastId });
    }
  };

  return (
    <button className={styles.button} onClick={deleteHandler}>
      حذف آگهی
      <FaTrash />
    </button>
  );
}

export default DeleteButton;
