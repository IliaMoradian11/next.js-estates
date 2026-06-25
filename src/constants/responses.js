import { NextResponse } from "next/server";

export const dbConnectionFaild = () => {
  return NextResponse.json(
    { ok: false, error: "مشکلی در سرور پیش آمد" },
    { status: 500 },
  );
};

export const internalServerError = () => {
  return NextResponse.json(
    { ok: false, error: "مشکلی در سرور پیش آمد" },
    { status: 500 },
  );
};

export const unProcessableEntity = (
  message = "لطفا اطلاعات معتبر وارد کنید",
) => {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    { status: 422 },
  );
};

export const notSignedIn = () => {
  return NextResponse.json(
    { ok: false, error: "ابتدا وارد حساب کاربری خود شوید" },
    { status: 401 },
  );
};

export const notFound = (message = "یافت نشد") => {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    { status: 404 },
  );
};

export const notAllowed_403 = (
  message = "شما قادر به انجام این کار نیستید",
) => {
  return NextResponse.json(
    {
      ok: false,
      error: message,
    },
    { status: 403 },
  );
};

export const changedSuccessfully = (data = null) => {
  return NextResponse.json({
    ok: true,
    message: "با موفقیت تغییر کرد",
    data,
  });
};

export const deletedSuccessfully = (message = "حذف شد") => {
  return NextResponse.json({
    ok: true,
    message: "حذف شد",
  });
};

export const createdSuccessfully = (message = "با موفقیت ایجاد شد") => {
  return NextResponse.json({ ok: true, message }, { status: 201 });
};

export const successfullyGet = (data) => {
  return NextResponse.json({ ok: true, data });
};
