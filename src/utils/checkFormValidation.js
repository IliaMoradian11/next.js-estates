export function checkFormValidation(form, toast) {
  const {
    title,
    descriptions,
    location,
    phone,
    price,
    realState,
    category,
    constructionDate,
  } = form;

  if (
    !title ||
    !descriptions ||
    !location ||
    !phone ||
    !price ||
    !realState ||
    !category ||
    !constructionDate
  ) {
    toast.error("لطفا فیلد های الزامی (ستاره دار) را پر کنید");
    return false;
  }

  if (isNaN(+phone)) {
    toast.error("شماره تلفن باید عدد باشد");
    return false;
  }

  if (+form.price < 1000000) {
    toast.error("قیمت باید حتما بیشتر از 1 میلیون تومان باشد");
    return false;
  }

  return true;
}
