import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return typeof initialValue === "function" ? initialValue() : initialValue;
  });

  function setItem(value) {
    setValue((prevValue) => {
      const newValue = typeof value === "function" ? value(prevValue) : value;
      localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  }

  return [value, setItem] as const;
}
