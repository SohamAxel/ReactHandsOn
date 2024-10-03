import { createContext, useEffect, useState } from "react";
import CalendarDays from "./Components/CalendarDays";
import CalendarHeader from "./Components/CalendarHeader";
import "./styles.css";
import { addMonths } from "date-fns";
import useLocalStorage from "./Hooks/useLocalStorage.js";

export const CalendarContext = createContext();
export const EventContext = createContext();

function App() {
  const [currentDate, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useLocalStorage([]);
  const setCurrentMonthToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleEventAdd = (event) => {
    setEvents((e) => {
      return [
        ...e,
        {
          id: crypto.randomUUID(),
          ...event,
        },
      ];
    });
  };

  const handleEventUpdate = (id, event) => {
    setEvents((prevEvents) => {
      return prevEvents.map((e) => {
        if (e.id == id) return { id, ...event };
        return e;
      });
    });
  };

  const handleEventDelete = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((e) => e.id !== id);
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, -1));
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentMonthToToday,
        handleNextMonth,
        handlePrevMonth,
      }}
    >
      <EventContext.Provider
        value={{
          events,
          handleEventAdd,
          handleEventUpdate,
          handleEventDelete,
        }}
      >
        <div className="calendar">
          <CalendarHeader />
          <CalendarDays />
        </div>
      </EventContext.Provider>
    </CalendarContext.Provider>
  );
}

export default App;
