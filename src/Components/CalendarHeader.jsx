import React, { useContext } from "react";
import { CalendarContext } from "../App";
import { format } from "date-fns";

const CalendarHeader = () => {
  const {
    currentDate,
    setCurrentMonthToToday,
    handleNextMonth,
    handlePrevMonth,
  } = useContext(CalendarContext);
  return (
    <div className="header">
      <button className="btn" onClick={() => setCurrentMonthToToday()}>
        Today
      </button>
      <div>
        <button className="month-change-btn" onClick={() => handlePrevMonth()}>
          &lt;
        </button>
        <button className="month-change-btn" onClick={() => handleNextMonth()}>
          &gt;
        </button>
      </div>
      <span className="month-title">{`${format(currentDate, "MMM")} ${format(
        currentDate,
        "yyy"
      )}`}</span>
    </div>
  );
};

export default CalendarHeader;
