"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import { initialState } from "@/constants/profiles";
import AddEditProfile from "../modules/AddEditProfile";
import { checkFormValidation } from "@/utils/checkFormValidation";

function AddProfilePage() {
  const [form, setForm] = useState(initialState);
  const [isFetching, setIsFetching] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    const isValid = checkFormValidation(form, toast);
    if (!isValid) return;

    const toastId = toast.loading("در حال ارسال اطلاعات ...");
    setIsFetching(true);

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
      setIsFetching(false);
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        setForm(initialState);
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      setIsFetching(false);
      toast.error("آگهی ایجاد نشد", { id: toastId });
    }
  };

  return (
    <AddEditProfile
      form={form}
      headerText="ثبت آگهی"
      isFetching={isFetching}
      submitHandler={submitHandler}
      setForm={setForm}
    />
  );
}

export default AddProfilePage;
