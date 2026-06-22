export const forms = [
  { label: "عنوان آگهی", type: "text", id: "title", required: true },
  { label: "توضیحات", type: "textarea", id: "descriptions", required: true },
  { label: "آدرس", type: "text", id: "location", required: true },
  { label: "شماره تماس", type: "number", id: "phone", required: true },
  { label: "قیمت (تومان)", type: "number", id: "price", required: true },
  { label: "بنگاه", type: "text", id: "realState", required: true },
  {
    label: "دسته بندی",
    type: "radio",
    values: ["villa", "apartment", "store", "office"],
    valuesText: ["ویلا", "آپارتمان", "مغازه", "دفتر"],
    id: "category",
    required: true,
  },
  {
    label: "امکانات رفاهی",
    type: "text-list",
    id: "amenities",
    required: false,
  },
  { label: "قوانین", type: "text-list", id: "rules", required: false },
  { label: "تاریخ ساخت", type: "date", id: "constructionDate", required: true },
];

export const initialState = {
  title: "",
  descriptions: "",
  location: "",
  phone: "",
  price: "",
  realState: "",
  category: "",
  constructionDate: new Date(),
  amenities: [],
  rules: [],
};
