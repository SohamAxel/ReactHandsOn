import React, { useEffect, useState } from 'react'

const useFetch = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setData([]);

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url, {signal, ...options})
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => {
        if (e?.name == 'AbortError') return;
        setError(true); 
      })
      .finally(() => {
        if (controller.signal.aborted) return;
        setLoading(false)
      })
  
    return () => {
      controller.abort();
    }
  }, [url])
  

  return {
    data,
    isLoading,
    isError,
  }
}

export default useFetch