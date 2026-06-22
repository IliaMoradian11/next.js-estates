import styles from "./DefaultInput.module.css";

function DefaultInput({ input: { label, id, type } }) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </div>
  );
}

export default DefaultInput;
