import * as React from "react";
import { Switch } from "./switch";
import { createContext } from "react";
import { useContext } from "react";

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <div>
            <ToggleButton />
          </div>
        </div>
      </Toggle>
    </div>
  );
}

const Context = createContext();
Context.displayName = "ToggleContext"; // For better dev tools readability.

const useToggle = () => {
  const data = useContext(Context);
  if (!data) {
    throw new Error("useToggle must be inside Toggle Context provider");
  }
  return data;
};

const Toggle = ({ children }) => {
  const [on, setOn] = React.useState(false);
  return <Context.Provider value={{ on, setOn }}>{children}</Context.Provider>;
};

const ToggleOn = ({ children }) => {
  const { on } = useToggle();
  return on ? children : "";
};
const ToggleOff = ({ children }) => {
  const { on } = useToggle();
  return !on ? children : "";
};
const ToggleButton = () => {
  const { on, setOn } = useToggle();
  const toggle = () => setOn((p) => !p);
  return <Switch on={on} onClick={toggle} />;
};

export default App;
