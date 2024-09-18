import CounterName from "./Components/CounterName";
import { CounterNameClass } from "./Components/CounterNameClass";

function App() {
  return (
    <>
      <h3>Functional Component</h3>
      <CounterName />
      <h3>Class Component</h3>
      <CounterNameClass />
    </>
  );
}

export default App;
