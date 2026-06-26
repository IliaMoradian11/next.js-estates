import { forms } from "@/constants/profiles";
import { v7 } from "uuid";

import TextArea from "../modules/TextArea";
import RadioInputs from "../modules/RadioInputs";
import TextList from "../modules/TextList";
import DefaultInput from "../modules/DefaultInput";
import DateInput from "../modules/DateInput";
import SelectOption from "./SelectOption";
import LoadingButton from "./LoadingButton";

import styles from "./AddEditProfile.module.css";

function AddEditProfile({
  headerText,
  submitHandler,
  form,
  setForm,
  isFetching,
}) {
  console.log(form);
  const addForm = (name) => {
    setForm({ ...form, [name]: [...form[name], { text: "", listId: v7() }] });
  };

  const removeForm = (name, index) => {
    const newForm = form[name].filter((i, iIndex) => iIndex !== index);
    setForm({ ...form, [name]: newForm });
  };

  const textChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const radioChangeHandler = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const listChangeHandler = (e) => {
    const { name, index } = e.target.dataset;
    const newForm = [...form[name]];
    newForm[index].text = e.target.value;
    setForm({ ...form, [name]: newForm });
  };

  const dateChangeHandler = (value) => {
    setForm({ ...form, constructionDate: value });
  };

  return (
    <div className={styles.container}>
      <h6>{headerText}</h6>
      <form onSubmit={submitHandler}>
        {forms.map((input) => {
          switch (input.type) {
            case "textarea":
              return (
                <TextArea
                  input={input}
                  key={input.id}
                  value={form[input.id]}
                  changeHandler={textChangeHandler}
                />
              );
            case "radio":
              return (
                <RadioInputs
                  input={input}
                  key={input.id}
                  value={form[input.id]}
                  changeHandler={radioChangeHandler}
                />
              );
            case "text-list":
              return (
                <TextList
                  input={input}
                  form={form}
                  addHandler={addForm}
                  removeHandler={removeForm}
                  key={input.id}
                  changeHandler={listChangeHandler}
                />
              );
            case "date":
              return (
                <DateInput
                  input={input}
                  date={form.constructionDate}
                  changeHandler={dateChangeHandler}
                  key={input.id}
                />
              );
            case "select-option":
              return (
                <SelectOption
                  input={input}
                  value={form.city}
                  key={input.id}
                  changeHandler={textChangeHandler}
                />
              );
            default:
              return (
                <DefaultInput
                  input={input}
                  key={input.id}
                  value={form[input.id]}
                  changeHandler={textChangeHandler}
                />
              );
          }
        })}
        {isFetching ? (
          <LoadingButton />
        ) : (
          <button type="submit">ثبت آگهی</button>
        )}
      </form>
    </div>
  );
}

export default AddEditProfile;
