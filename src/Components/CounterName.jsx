import React from "react";
import { useState } from "react";

const CounterName = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onInput={(e) => setName(e.target.value)}
      />
      <div className="counter">
        <button onClick={() => setAge((p) => p - 1)}>-</button>
        {age}
        <button onClick={() => setAge((p) => p + 1)}>+</button>
      </div>
      <p>{`My name is ${name} and I am ${age} years old`}</p>
    </>
  );
};

export default CounterName;
