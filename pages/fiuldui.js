import moment from "moment/moment";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const FieldUI = () => {
  const [value, setValue] = useState("");
  const [calenderDate, setCalenderDate] = useState("");
  const [isActive, setActive] = useState(true);
  const [err, setErr] = useState(false);

  const changeFormat = (input) => {
    let output = input.split("/");
    return output[2] + "-" + output[1] + "-" + output[0];
  };

  const checkDate = (newDate) => {
    let current_date = new Date();
    let new_date = new Date(newDate);
    if (new_date != "Invalid Date") {
      if (current_date.getFullYear() > new_date.getFullYear()) {
        console.log("if year");
        return true;
      } else {
        console.log("else year");
        if (current_date.getMonth() + 1 > new_date.getMonth() + 1) {
          console.log("if month");
          return true;
        } else if (current_date.getMonth() + 1 == new_date.getMonth() + 1) {
          console.log("else if month");
          if (current_date.getDate() <= new_date.getDate()) {
            console.log("if date");
            return false;
          } else {
            console.log("else date");
            return true;
          }
        } else {
          console.log("else month");
          return false;
        }
      }
    } else {
      console.log("else validate");
      return true;
    }
  };

  console.log("checkDate", checkDate(changeFormat(value)));

  const handleInput = (e) => {
    try {
      let key = e.key;
      let input = e.target.value;

      console.log("valid");
      setErr(false);
      if (key != "Backspace") {
        if (input.length == 2 || input.length == 5) {
          let merge = value + "/";
          setValue(merge);
        }
        if (input.length == 10) {
          let output = changeFormat(input);
          console.log(
            "new Date(output) > new Date()",
            new Date(output) > new Date()
          );
          if (
            new Date(output) != "Invalid Date" &&
            new Date(output) >= new Date()
          ) {
            setValue(input);
            console.log("value if", new Date(output));
            setCalenderDate(new Date(output));
          } else {
            console.log("invalid date");
            setErr(true);
            setCalenderDate("");
          }
        }
      } else {
        console.log("value else", input);
        setCalenderDate(new Date());
      }
    } catch (error) {
      console.log("error", error.message);
      setErr(true);
    }
  };

  return (
    <div>
      <div
        id="cal"
        className="px-3 py-2 mx-2 mt-2 rounded-pill"
        style={{ display: "flex", border: "1px solid black", width: "350px" }}
      >
        <input
          onKeyUp={handleInput}
          type="text"
          id="date_input"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="dd/mm/yyyy"
        />
        <svg
          onClick={() => setActive(!isActive)}
          fill="#000000"
          width="25px"
          height="30px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19,4H17V3a1,1,0,0,0-2,0V4H9V3A1,1,0,0,0,7,3V4H5A3,3,0,0,0,2,7V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4Zm1,15a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V12H20Zm0-9H4V7A1,1,0,0,1,5,6H7V7A1,1,0,0,0,9,7V6h6V7a1,1,0,0,0,2,0V6h2a1,1,0,0,1,1,1Z" />
        </svg>
      </div>
      <Calendar
        className={`calender float-end ${isActive ? "d-none" : "d-block ms-2"}`}
        activeStartDate={calenderDate}
        onChange={(value, event) => {
          console.log("Change", value);
          setCalenderDate(value);
          setValue(moment(value).format("DD/MM/YYYY"));
          setActive(true);
        }}
        minDate={new Date()}
        value={calenderDate}
      />
      {err && checkDate(changeFormat(value)) && (
        <p className="ms-4" style={{ fontSize: "11px", color: "red" }}>
          Enter valid date
        </p>
      )}
      {/* <h1>Calendar - GeeksforGeeks</h1> */}
    </div>
  );
};

export default FieldUI;
