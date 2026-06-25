"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import AddEditProfile from "@/components/modules/AddEditProfile";
import { checkFormValidation } from "@/utils/checkFormValidation";

function EditProfilePage({ initialState, profileId }) {
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
      const newKeyWordsMetadata = form.keyWordsMetadata.filter((i) => i.text);

      const res = await fetch(`/api/profile/${profileId}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          amenities: newAmenities,
          rules: newRules,
          keyWordsMetadata: newKeyWordsMetadata,
          phone: +form.phone,
        }),
        headers: { "Content-Type": "applicaton/json" },
      });
      const json = await res.json();
      setIsFetching(false);
      if (json.ok) {
        toast.success(json.message, { id: toastId });
        setForm(json.data);
      } else {
        toast.error(json.error, { id: toastId });
      }
    } catch (err) {
      setIsFetching(false);
      toast.error("آگهی تغییر نکرد", { id: toastId });
    }
  };

  return (
    <AddEditProfile
      headerText="ویرایش آگهی"
      form={form}
      setForm={setForm}
      isFetching={isFetching}
      submitHandler={submitHandler}
    />
  );
}

export default EditProfilePage;
