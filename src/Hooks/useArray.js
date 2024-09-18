import { useCallback, useState } from "react";

const useArray = (initial_array) => {
  const [array, setArray] = useState(initial_array);

  const push = useCallback((val) => {
    setArray((prevArray) => [...prevArray, val]);
  }, []);
  const replace = useCallback((ind, val) => {
    setArray((prevArray) => {
      return prevArray.map((value, index) => {
        if (index == ind) {
          return val;
        } else {
          return value;
        }
      });
    });
  }, []);
  const filter = useCallback((func) => {
    setArray((prevArray) => {
      return prevArray.filter(func);
    });
  }, []);
  const remove = useCallback((ind) => {
    setArray((prevArray) => {
      return prevArray.filter((value, index) => index != ind);
    });
  }, []);
  const clear = useCallback(() => {
    setArray([]);
  }, []);
  const reset = useCallback(() => {
    setArray(initial_array);
  }, []);

  return { array, set: setArray, push, replace, filter, remove, clear, reset };
};

export default useArray;
