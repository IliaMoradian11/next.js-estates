import { v7 } from "uuid";

import styles from "./RadioInputs.module.css";

function RadioInputs({
  input: { label, values },
  value: valueProps,
  changeHandler,
}) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div>
        {values.map((value) => (
          <button key={v7()} onClick={changeHandler} value={value}>
            {value}
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
