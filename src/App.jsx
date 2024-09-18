import "./App.css";
import UserCard from "./Components/UserCard";
import UserCardClass from "./Components/UserCardClass";
import user from "./user.json";

const App = () => {
  return (
    <>
      <UserCard {...user} />
      <UserCardClass {...user} />
    </>
  );
};

export default App;
