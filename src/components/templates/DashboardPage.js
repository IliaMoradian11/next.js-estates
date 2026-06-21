import styles from "./DashboardPage.module.css";

function DashboardPage({ createdAt }) {
  return (
    <div className={styles.container}>
      <h6>سلام👋</h6>
      <p>آگهی های خود را ثبت کنید تا هزاران نفر آن را مشاهده کنند</p>
      <div className={styles.createdAt}>
        <p>تاریخ عضویت:</p>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default DashboardPage;
