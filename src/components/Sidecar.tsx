import { useState } from "react";
import { Command } from "@tauri-apps/plugin-shell";

function Sidecar() {
  const [goMsg, setGoMsg] = useState("");

  async function go() {
    const command = Command.sidecar("../bin/demo-sidecar");
    const output = await command.execute();
    setGoMsg(output.stdout);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          go();
        }}
      >
        Go!
      </button>
      <p
        onClick={() => {
          setGoMsg("");
        }}
      >
        {goMsg}
      </p>
    </div>
  );
}

export default Sidecar;
