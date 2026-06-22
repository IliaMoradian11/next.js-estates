import styles from "./TextArea.module.css";

function TextArea({ input: { id, label }, value, changeHandler }) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={changeHandler}
      ></textarea>
    </div>
  );
}

export default TextArea;
