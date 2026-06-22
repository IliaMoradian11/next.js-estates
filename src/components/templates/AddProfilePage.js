"use client";

import { useState } from "react";

import { forms, initialState } from "@/constants/profiles";

import TextArea from "../modules/TextArea";
import RadioInputs from "../modules/RadioInputs";
import TextList from "../modules/TextList";
import DefaultInput from "../modules/DefaultInput";

function AddProfilePage() {
  const [form, setForm] = useState(initialState);

  const addForm = (name) => {
    setForm({ ...form, [name]: [...form[name], ""] });
  };

  const removeForm = (name, index) => {
    const newFormType2 = form[name].filter((i, iIndex) => iIndex !== index);
    setForm({ ...form, [name]: newFormType2 });
  };

  return (
    <div>
      <h6>ثبت آگهی</h6>
      {forms.map((input) => {
        switch (input.type) {
          case "textarea":
            return <TextArea input={input} />;
          case "radio":
            return <RadioInputs input={input} />;
          case "text-list":
            return (
              <TextList
                input={input}
                form={form}
                addHandler={addForm}
                removeHandler={removeForm}
              />
            );
          default:
            return <DefaultInput input={input} />;
        }
      })}
      <button>ثبت آگهی</button>
    </div>
  );
}

export default AddProfilePage;
