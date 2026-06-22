import { v7 } from "uuid";

function TextArea({ input: { id, label } }) {
  return (
    <div key={v7()}>
      <label htmlFor={id}>{label}</label>
      <textarea id={id}></textarea>
    </div>
  );
}

export default TextArea;
