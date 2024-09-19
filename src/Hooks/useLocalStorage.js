import { useEffect, useState } from "react";

const useLocalStorage = (key, value) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem(key);
    if (storedData){
      return JSON.parse(storedData);
    } else {
      if (typeof value == 'function') {
        return value();
      } else {
        return value;
      }
    }
  });

  useEffect(() => {
    console.log("data changed");
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      localStorage.removeItem(key);
    }
  }, [data, key])
  

  return [data, setData];
};

export default useLocalStorage;
