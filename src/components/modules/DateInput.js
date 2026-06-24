import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function DateInput({ input: { required }, date, changeHandler }) {
  return (
    <div>
      <label
        style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}
      >
        تاریخ ساخت
        {required && (
          <span style={{ marginRight: "3px", color: "var(--color-red)" }}>
            *
          </span>
        )}
      </label>
      <DatePicker
        style={{
          border: "2px dashed var(--color-blue)",
          padding: "15px",
          fontSize: "1rem",
          color: "grey",
          textAlign: "center",
        }}
        calendar={persian}
        locale={persian_fa}
        calendarPosition="bottom-right"
        value={date}
        onChange={changeHandler}
        animations={[
          opacity(),
          transition({
            from: 40,
            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
          }),
        ]}
      />
    </div>
  );
}

export default DateInput;
