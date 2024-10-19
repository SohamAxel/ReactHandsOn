import { useState, useEffect } from "react";

const key = "CALENDAR_EVENTS";

const useLocalStorage = (value) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      if (typeof value == "function") {
        return value();
      } else {
        return value;
      }
    }
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.removeItem(key);
    }
  }, [data, key]);

  return [data, setData];
};

export default useLocalStorage;
