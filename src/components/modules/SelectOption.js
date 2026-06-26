import { cities } from "@/constants/homePage";

import styles from "./SelectOption.module.css";

function SelectOption({ input, value, changeHandler }) {
  return (
    <div className={styles.container}>
      <label>{input.label}</label>
      <select name={input.id} value={value} onChange={changeHandler}>
        {cities.map((city) => (
          <option value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectOption;
