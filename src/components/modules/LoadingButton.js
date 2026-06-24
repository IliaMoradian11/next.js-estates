import { ThreeDots } from "react-loader-spinner";

import styles from "./LoadingButton.module.css";

function LoadingButton() {
  return (
    <button disabled className={styles.button}>
      <ThreeDots color="white" width={50} height={16} />
    </button>
  );
}

export default LoadingButton;
