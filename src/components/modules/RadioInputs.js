import { v7 } from "uuid";

function RadioInputs({ input: { label, values } }) {
  return (
    <div key={v7()}>
      <label>{label}</label>
      {values.map((value) => (
        <button key={v7()}>
          {value}
          <input type="radio" name={label} />
        </button>
      ))}
    </div>
  );
}

export default RadioInputs;
