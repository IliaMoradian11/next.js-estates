import styles from "./TextArea.module.css";

function TextArea({ input: { id, label, required }, value, changeHandler }) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        {label}
        {required && (
          <span style={{ marginRight: "5px", color: "var(--color-red)" }}>
            *
          </span>
        )}
      </label>
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
