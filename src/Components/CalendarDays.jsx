import React, { useContext, useMemo } from "react";
import { CalendarContext } from "../App";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";

const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDays = () => {
  const { currentDate } = useContext(CalendarContext);
  const visibleDates = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(startOfMonth(currentDate)),
      end: endOfWeek(endOfMonth(currentDate)),
    });
  }, [currentDate]);

  return (
    <div className="days">
      {visibleDates.map((date, index) => {
        return (
          <div
            key={date}
            className={`day ${
              !isSameMonth(date, currentDate) && "non-month-day"
            } ${isBefore(date, addDays(currentDate, -1)) && "old-month-day"}`}
          >
            <div className="day-header">
              {day[index] && <div className="week-name">{day[index]}</div>}
              <div className={`day-number ${isToday(date) && "today"}`}>{format(date, "dd")}</div>
              <button className="add-event-btn">+</button>
            </div>
            <div className="events"></div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarDays;
