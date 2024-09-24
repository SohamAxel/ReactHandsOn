import { createContext, useState } from "react";
import CalendarDays from "./Components/CalendarDays";
import CalendarHeader from "./Components/CalendarHeader";
import "./styles.css";
import { addMonths } from "date-fns";

export const CalendarContext = createContext();

function App() {
  const [currentDate, setCurrentMonth] = useState(new Date());

  const setCurrentMonthToToday = () => {
    setCurrentMonth(new Date());
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
      <div className="calendar">
        <CalendarHeader />
        <CalendarDays />
      </div>
    </CalendarContext.Provider>
  );
}

export default App;
