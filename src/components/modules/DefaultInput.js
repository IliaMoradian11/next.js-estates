import { v7 } from "uuid";

function DefaultInput({ input: { label, id, type } }) {
  return (
    <div key={v7()}>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} />
    </div>
  );
}

export default DefaultInput;
