import React, { Fragment, useContext, useRef, useState } from "react";
import { EventContext } from "../App";

const colors = ["blue", "red", "green"];

const EventForm = ({ defaultValues = {}, date, handleCloseEventForm }) => {
  const nameRef = useRef();
  const [allDay, setAllDay] = useState(defaultValues.allDay ?? true);
  const [currentColor, setColor] = useState(defaultValues.color ?? colors[0]);
  const [startTime, setStartTime] = useState(defaultValues.startTime ?? "");
  const [endTime, setEndTime] = useState(defaultValues.endTime ?? "");
  const { handleEventAdd, handleEventUpdate, handleEventDelete } =
    useContext(EventContext);
  console.log(defaultValues);
  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      date: "",
      name: "",
      allDay: "",
      startTime: "",
      endTime: "",
    };
    const name = nameRef.current.value;

    if (name === "") return;
    event.name = name;
    event.date = date;
    if (!allDay) {
      if (startTime === "" || endTime === "") return;
      event.allDay = false;
      event.startTime = startTime;
      event.endTime = endTime;
    } else {
      event.allDay = true;
    }
    event.color = currentColor;
    if (defaultValues.id) {
      handleEventUpdate(defaultValues.id, event);
    } else {
      handleEventAdd(event);
    }
    handleCloseEventForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          ref={nameRef}
          defaultValue={defaultValues.name}
        />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="all-day"
          id="all-day"
          onChange={() => setAllDay((p) => !p)}
          checked={allDay}
        />
        <label htmlFor="all-day">All Day?</label>
      </div>
      <div className="row">
        <div className="form-group">
          <label htmlFor="start-time">Start Time</label>
          <input
            type="time"
            name="start-time"
            id="start-time"
            disabled={allDay}
            value={startTime}
            required
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="end-time">End Time</label>
          <input
            type="time"
            name="end-time"
            id="end-time"
            min={startTime}
            disabled={allDay}
            value={endTime}
            required
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <label>Color</label>
        <div className="row left">
          {colors.map((color) => {
            return (
              <Fragment key={color}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  id={color}
                  onChange={(e) => setColor(e.target.value)}
                  checked={currentColor === color}
                  className="color-radio"
                />
                <label htmlFor={color}>
                  <span className="sr-only">Blue</span>
                </label>
              </Fragment>
            );
          })}
        </div>
      </div>
      <div className="row">
        <button className="btn btn-success" type="submit">
          {
            defaultValues.id ? "Edit" : "Add"
          }
        </button>
        {defaultValues.id && (
          <button
            className="btn btn-delete"
            type="button"
            onClick={() => handleEventDelete(defaultValues.id)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
