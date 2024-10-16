import * as React from "react";
import { Switch } from "./switch";

const callAllFns = (...fns) => {
  return (...args) => {
    fns.forEach((fn) => {
      fn && fn(...args);
    });
  };
};

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const getTogglerProps = ({ onClick, ...props } = {}) => {
    return {
      "aria-pressed": "on",
      onClick: callAllFns(onClick, toggle),
      ...props,
    };
  };
  const togglerProps = {
    "aria-pressed": "on",
    onClick: toggle,
  };
  return { on, togglerProps, getTogglerProps };
}

function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}

export default App;
