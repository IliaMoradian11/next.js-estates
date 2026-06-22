import { FaTrash } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";

import styles from "./TextList.module.css";

function TextList({
  input: { label, id },
  form,
  removeHandler,
  addHandler,
  changeHandler,
}) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {form[id].map((i, index) => (
        <div key={i.listId}>
          <input
            type="text"
            value={form[id][index].text}
            onChange={changeHandler}
            data-index={index}
            data-name={id}
          />
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
