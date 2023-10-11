import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Greeter() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    if (name === "") return;

    setGreetMsg(await invoke("greet", { name }));
    setName("");
  }

  return (
    <div>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
          value={name}
        />
        <button type="submit" disabled={name === ""}>
          Greet
        </button>
      </form>
      <p
        onClick={() => {
          setGreetMsg("");
        }}
      >
        {greetMsg}
      </p>
    </div>
  );
}

export default Greeter;
