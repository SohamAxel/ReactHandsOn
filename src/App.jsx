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
        <ToggleButton />
      </Toggle>
    </div>
  );
}

const Context = createContext();

const Toggle = ({ children }) => {
  const [on, setOn] = React.useState(false);
  return <Context.Provider value={{ on, setOn }}>{children}</Context.Provider>;
};

const ToggleOn = ({ children }) => {
  const { on } = useContext(Context);
  return on ? children : "";
};
const ToggleOff = ({ children }) => {
  const { on } = useContext(Context);
  return !on ? children : "";
};
const ToggleButton = () => {
  const { on, setOn } = useContext(Context);
  const toggle = () => setOn((p) => !p);
  return <Switch on={on} onClick={toggle} />;
};

export default App;
