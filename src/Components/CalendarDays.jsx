import React, { Fragment, useContext, useMemo, useRef, useState } from "react";
import { CalendarContext, EventContext } from "../App";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isEqual,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import CustomModal from "./CustomModal";
import EventForm from "./EventForm";

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
    <>
      <div className="days">
        {visibleDates.map((date, index) => {
          return (
            <CalendarDay
              key={date}
              date={date}
              currentDate={currentDate}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
};

const CalendarDay = ({ date, currentDate, index }) => {
  const [openEventModal, setOpenEventModal] = useState(false);
  const { events } = useContext(EventContext);
  const handleAddEvent = (e) => {
    setOpenEventModal(true);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((event) => isEqual(event.date, date));
  }, [events]);

  const allDayEvents = useMemo(() => {
    return filteredEvents.filter((event) => event.allDay);
  }, [filteredEvents]);

  const nonAllDayEvents = useMemo(() => {
    return filteredEvents.filter((event) => !event.allDay);
  }, [filteredEvents]);
  const handleCloseEventForm = () => {
    setOpenEventModal(false);
  };
  return (
    <>
      <div
        className={`day ${!isSameMonth(date, currentDate) && "non-month-day"} ${
          isBefore(date, addDays(currentDate, -1)) && "old-month-day"
        }`}
      >
        <div className="day-header">
          {day[index] && <div className="week-name">{day[index]}</div>}
          <div className={`day-number ${isToday(date) && "today"}`}>
            {format(date, "dd")}
          </div>
          <button className="add-event-btn" onClick={handleAddEvent}>
            +
          </button>
        </div>
        <div className="events">
          {allDayEvents.map((event) => {
            return (
              <button
                key={event.id}
                className={`all-day-event ${event.color} event`}
              >
                <div className="event-name">{event.name}</div>
              </button>
            );
          })}
          {nonAllDayEvents.map((event) => {
            return (
              <button key={event.id} className="event">
                <div className={`color-dot ${event.color}`}></div>
                <div className="event-time">{event.startTime}</div>
                <div className="event-name">{event.name}e</div>
              </button>
            );
          })}
        </div>
      </div>
      <CustomModal
        handleCloseEventForm={handleCloseEventForm}
        openEventModal={openEventModal}
      >
        <EventForm date={date} handleCloseEventForm={handleCloseEventForm} />
      </CustomModal>
    </>
  );
};

export default CalendarDays;
