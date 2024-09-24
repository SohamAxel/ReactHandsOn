import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from "date-fns";
import React, { useMemo, useState } from "react";

const DatePicker = ({ value, onChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const hideDatePicker = () => {
    setShowDatePicker(false);
  }
  return (
    <div className="date-picker-container">
      <button
        className="date-picker-button"
        onClick={() => setShowDatePicker((p) => !p)}
      >
        {format(value, "LLL dd, yyyy")}
      </button>
      {showDatePicker && <DatePickerModal value={value} onChange={onChange} hideDatePicker={hideDatePicker}/>}
    </div>
  );
};

const DatePickerModal = ({ value, onChange, hideDatePicker }) => {
  const [currentMonth, setCurrentMonth] = useState(value);

  const visibleDates = useMemo(() => eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  }), [currentMonth]);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      return addMonths(prevMonth, 1);
    });
  };
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      return addMonths(prevMonth, -1);
    });
  };

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button
          className="prev-month-button month-button"
          onClick={() => handlePrevMonth()}
        >
          &larr;
        </button>
        <div className="current-month">
          {format(currentMonth, "LLL")} - {format(currentMonth, "yyyy")}
        </div>
        <button
          className="next-month-button month-button"
          onClick={() => handleNextMonth()}
        >
          &rarr;
        </button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="date-picker-grid-dates date-picker-grid">
        {visibleDates.map((date) => (
          <button
            onClick={() => {
              onChange(date);
              hideDatePicker();
            }}
            className={`date ${
              !isSameMonth(date, currentMonth) && "date-picker-other-month-date"
            } ${isSameDay(date, value) && "selected"} ${
              isToday(date) && "today"
            }`}
            key={date.toDateString()}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
