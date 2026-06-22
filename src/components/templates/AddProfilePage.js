"use client";

import { useState } from "react";
import { v7 } from "uuid";

import { forms, initialState } from "@/constants/profiles";

import TextArea from "../modules/TextArea";
import RadioInputs from "../modules/RadioInputs";
import TextList from "../modules/TextList";
import DefaultInput from "../modules/DefaultInput";
import DateInput from "../modules/DateInput";
import toast from "react-hot-toast";

import styles from "./AddProfilePage.module.css";

function AddProfilePage() {
  const [form, setForm] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false)

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

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !form.title ||
      !form.descriptions ||
      !form.location ||
      !form.phone ||
      !form.price ||
      !form.realState ||
      !form.category ||
      !form.constructionDate
    ) {
      toast.error("لطفا فیلد های الزامی (ستاره دار) را پر کنید");
      return;
    }

    if (form.price < 1000000) {
      toast.error("قیمت باید حتما بیشتر از 1 میلیون تومان باشد");
      return;
    }

    const toastId = toast.loading("در حال ارسال اطلاعات ...");
    setIsFetching(true)

    try {
      const newAmenities = form.amenities.filter((i) => i.text);
      const newRules = form.rules.filter((i) => i.text);

      const res = await fetch("/api/profile", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          amenities: newAmenities,
          rules: newRules,
        }),
        headers: { "Content-Type": "applicaton/json" },
      });
      const json = await res.json();
      setIsFetching(false)
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        setForm(initialState)
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      setIsFetching(false)
      toast.error("آگهی ایجاد نشد", { id: toastId });
    }
  };

  return (
    <div className={styles.container}>
      <h6>ثبت آگهی</h6>
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
        <button type="submit" disabled={isFetching}>ثبت آگهی</button>
      </form>
    </div>
  );
}

export default AddProfilePage;
