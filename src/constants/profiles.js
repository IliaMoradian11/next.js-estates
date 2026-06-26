export const forms = [
  { label: "عنوان آگهی", type: "text", id: "title", required: true },
  { label: "توضیحات", type: "textarea", id: "descriptions", required: true },
  { label: "آدرس", type: "text", id: "location", required: true },
  { label: "شماره تماس", type: "text", id: "phone", required: true },
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
  {
    label: "تگ title (برای SEO)",
    type: "text",
    id: "titleMetadata",
    required: false,
  },
  {
    label: "تگ description (برای SEO)",
    type: "textarea",
    id: "descriptionMetadata",
    required: false,
  },
  {
    label: "تگ keywords (برای SEO)",
    type: "text-list",
    id: "keyWordsMetadata",
    required: false,
  },
  {
    label: "تگ author (برای SEO)",
    type: "text",
    id: "authorMetadata",
    required: false,
  },
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
  titleMetadata: "",
  descriptionMetadata: "",
  keyWordsMetadata: [],
  authorMetadata: "",
};

export const modelProfilelKeys = [
  "title",
  "descriptions",
  "location",
  "phone",
  "price",
  "realState",
  "category",
  "amenities",
  "rules",
  "constructionDate",
  "titleMetadata",
  "descriptionMetadata",
  "keyWordsMetadata",
  "authorMetadata",
];

export const categories = {
  villa: "خانه ویلایی",
  apartment: "آپارتمان",
  store: "مغازه",
  office: "دفتر کار",
};
