"use client";

import { useState } from "react";
import { v7 } from "uuid";

import { forms, initialState } from "@/constants/profiles";

import TextArea from "../modules/TextArea";
import RadioInputs from "../modules/RadioInputs";
import TextList from "../modules/TextList";
import DefaultInput from "../modules/DefaultInput";
import DateInput from "../modules/DateInput";

import styles from "./AddProfilePage.module.css";

function AddProfilePage() {
  const [form, setForm] = useState(initialState);

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
    setForm({ ...form, date: value });
  };

  return (
    <div className={styles.container}>
      <h6>ثبت آگهی</h6>
      <div>
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
                  date={form.date}
                  changeHandler={dateChangeHandler}
                  key={v7()}
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
        <button>ثبت آگهی</button>
      </div>
    </div>
  );
}

export default AddProfilePage;
