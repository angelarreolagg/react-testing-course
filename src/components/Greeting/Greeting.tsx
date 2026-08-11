import { useState } from "react";

function Greeting() {
    const [localUserName, setLocalUserName] = useState<string>("");
  return (
    <div>
    <h2>Enter your name:</h2>
    <input type="text" role="textbox" value={localUserName} onChange={(e) => setLocalUserName(e.target.value)} />
    <h1>Hello, {localUserName}!</h1>
    </div>
  )
}

export default Greeting