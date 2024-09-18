import { useState, useEffect } from "react";
import User from "./Components/User";

function App() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setLoading(true);

    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch("https://jsonplaceholder.typicode.com/users", { signal })
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        setUserList(jsonData);
      })
      .catch((error) => {
        if (error?.name == "AbortError") return;
        console.log("Api error occured");
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <h1>User List</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <ul>
          {userList.map((user) => (
            <User key={user.id} name={user.name} />
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
