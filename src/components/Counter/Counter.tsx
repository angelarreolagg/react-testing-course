import React, { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState<number>(0);

  const increaseCounter = () => {
    setCounter(counter + 1);
  };

  const decreaseCounter = () => {
    setCounter(counter - 1);
  };

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={increaseCounter}>Add</button>
      <button onClick={decreaseCounter}>Sub</button>
    </div>
  );
}

export default Counter;
