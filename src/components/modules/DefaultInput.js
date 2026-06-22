import styles from "./DefaultInput.module.css";

function DefaultInput({
  input: { label, id, type, required },
  value,
  changeHandler,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        {label}
        {required && (
          <span style={{ marginRight: "3px", color: "var(--color-red)" }}>
            *
          </span>
        )}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
}

export default DefaultInput;
