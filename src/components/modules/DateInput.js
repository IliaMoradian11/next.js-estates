import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function DateInput({ date, changeHandler }) {
  return (
    <div>
      <DatePicker
        style={{
          border: "2px dashed var(--color-blue)",
          padding: "15px",
          fontSize: "1rem",
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
