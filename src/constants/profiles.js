export const forms = [
  { label: "عنوان آگهی", type: "text", id: "title" },
  { label: "توضیحات", type: "textarea", id: "descriptions" },
  { label: "آدرس", type: "text", id: "location" },
  { label: "شماره تماس", type: "number", id: "phone" },
  { label: "قیمت (تومان)", type: "number", id: "price" },
  { label: "بنگاه", type: "text", id: "realState" },
  {
    label: "دسته بندی",
    type: "radio",
    values: ["ویلا", "آپارتمان", "مغازه", "دفتر"],
    id: "category",
  },
  { label: "امکانات رفاهی", type: "text-list", id: "amenities" },
  { label: "قوانین", type: "text-list", id: "rules" },
  { label: "تاریخ ساخت", type: "date", id: "date" },
];

export const initialState = {
  title: "",
  descriptions: "",
  location: "",
  phone: "",
  price: "",
  realState: "",
  category: "",
  date: new Date(),
  amenities: [],
  rules: [],
};
