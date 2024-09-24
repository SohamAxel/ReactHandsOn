import { useState } from "react";
import DatePicker from "./DatePicker";
import "./styles.css";

function App() {
  const [date, setDate] = useState(new Date());
  return (
    <DatePicker value={date} onChange={setDate}/>
  );
}

export default App;
