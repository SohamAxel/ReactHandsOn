import "./App.css";
import UserCard from "./Components/UserCard";
import user from './user.json';

const App = () => {
  return (
    <UserCard {...user} />
  );
}

export default App;
