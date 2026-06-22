import { FaTrash } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { v7 } from "uuid";

function TextList({ input: { label, id }, form, removeHandler, addHandler }) {
  return (
    <div key={v7()}>
      <label>{label}</label>
      {form[id].map((i, index) => (
        <div key={v7()}>
          <input type="text" />
          <button onClick={() => removeHandler(id, index)}>
            <span>حذف</span>
            <FaTrash />
          </button>
        </div>
      ))}
      <button onClick={() => addHandler(id)}>
        <span>افزودن</span>
        <MdOutlineLibraryAdd />
      </button>
    </div>
  );
}

export default TextList;
