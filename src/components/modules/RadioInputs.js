import { v7 } from "uuid";

import styles from "./RadioInputs.module.css";

function RadioInputs({
  input: { label, values, valuesText, required },
  value: valueProps,
  changeHandler,
}) {
  return (
    <div className={styles.container}>
      <label>
        {label}
        {required && (
          <span style={{ marginRight: "3px", color: "var(--color-red)" }}>
            *
          </span>
        )}
      </label>
      <div>
        {values.map((value, index) => (
          <button key={v7()} onClick={changeHandler} value={value}>
            {valuesText[index]}
            <input
              type="radio"
              name={label}
              value={value}
              checked={value === valueProps}
              onChange={changeHandler}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default RadioInputs;
